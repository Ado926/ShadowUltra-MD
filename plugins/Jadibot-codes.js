const fs = require('fs');
const path = require('path');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const QRCode = require('qrcode');
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason
} = require('@whiskeysockets/baileys');

const handler = async (msg, { conn, command }) => {
    console.log("Comando recibido:", command);
    const usarPairingCode = ["sercode", "code"].includes(command);
    let sentCodeMessage = false;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function serbot() {
        try {
            console.log("🔄 Intentando conectar subbot...");
            const number = msg.key?.participant || msg.key.remoteJid;
            const sessionDir = path.join(__dirname, "../subbots");
            const sessionPath = path.join(sessionDir, number);

            if (!fs.existsSync(sessionDir)) {
                fs.mkdirSync(sessionDir, { recursive: true });
            }

            console.log("✅ Directorio de sesiones validado.");

            await conn.sendMessage(msg.key.remoteJid, {
                react: { text: '⌛', key: msg.key }
            });

            const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
            const { version } = await fetchLatestBaileysVersion();
            const logger = pino({ level: "silent" });

            const socky = makeWASocket({
                version,
                logger,
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, logger)
                },
                printQRInTerminal: !usarPairingCode,
                browser: ['Shadow Bot', 'Chrome']
            });

            console.log("📶 Estado de conexión inicializado.");

            socky.ev.on("connection.update", async ({ qr, connection, lastDisconnect }) => {
                console.log("🔄 Estado de conexión:", connection);
                
                if (qr && !sentCodeMessage) {
                    console.log("📷 Generando QR...");
                    const qrImage = await QRCode.toBuffer(qr);
                    await conn.sendMessage(msg.key.remoteJid, {
                        image: qrImage,
                        caption: "📲 Escanea este código QR desde WhatsApp > Vincular dispositivo.",
                        quoted: msg
                    });
                    sentCodeMessage = true;
                }

                switch (connection) {
                    case "open":
                        console.log("✅ Subbot conectado.");
                        await conn.sendMessage(msg.key.remoteJid, {
text: "🎉 _Shadow Bot conectado exitosamente._ Usa `${global.prefix}menu` para comenzar.",
                            quoted: msg
                        });
                        break;

                    case "close":
                        console.log("❌ Se ha cerrado la conexión.");
                        const reason = new Boom(lastDisconnect?.error)?.output.statusCode || lastDisconnect?.error?.output?.statusCode;
                        console.error("🔴 Razón del cierre:", reason);
                        break;
                }
            });

            socky.ev.on("creds.update", saveCreds);

        } catch (error) {
            console.error("❌ Error en serbot:", error.message);
            await conn.sendMessage(msg.key.remoteJid, {
                text: `❌ *Error inesperado:* ${error.message}`,
                quoted: msg
            });
        }
    }

    await serbot();
};

handler.command = ['sercode', 'code', 'jadibot', 'serbot', 'qr'];
handler.tags = ['owner'];
handler.help = ['serbot', 'code'];
module.exports = handler;
