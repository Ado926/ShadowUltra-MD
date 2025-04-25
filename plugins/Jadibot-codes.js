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
    const usarPairingCode = ["sercode", "code"].includes(command);
    let sentCodeMessage = false;

    // Función para pausar ejecución
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function serbot() {
        try {
            console.log("🔄 Intentando conectar subbot...");
            const number = msg.key?.participant || msg.key.remoteJid; // Obtener número del usuario
            const sessionDir = path.join(__dirname, "../subbots"); // Directorio de sesión
            const sessionPath = path.join(sessionDir, number);

            // Validar y crear el directorio de sesiones si no existe
            if (!fs.existsSync(sessionDir)) {
                fs.mkdirSync(sessionDir, { recursive: true });
            }

            // Enviar reacción al mensaje para informar progreso
            await conn.sendMessage(msg.key.remoteJid, {
                react: { text: '⌛', key: msg.key }
            });

            // Configuración de autenticación
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

            let reconnectionAttempts = 0;
            const maxReconnectionAttempts = 3;

            // Evento de actualización de conexión
            socky.ev.on("connection.update", async ({ qr, connection, lastDisconnect }) => {
                if (qr && !sentCodeMessage) {
                    if (usarPairingCode) {
                        const code = await socky.requestPairingCode(number.split("@")[0]);
                        await conn.sendMessage(msg.key.remoteJid, {
                            text: `🔐 *Código generado:*\n\`\`\`${code}\`\`\`\nAbre WhatsApp > Vincular dispositivo y pega el código.`,
                            quoted: msg
                        });
                    } else {
                        const qrImage = await QRCode.toBuffer(qr);
                        await conn.sendMessage(msg.key.remoteJid, {
                            image: qrImage,
                            caption: "📲 Escanea este código QR desde *WhatsApp > Vincular dispositivo* para conectarte como subbot.",
                            quoted: msg
                        });
                    }
                    sentCodeMessage = true;
                }

                switch (connection) {
                    case "open":
                        console.log("✅ Subbot conectado exitosamente.");
                        await conn.sendMessage(msg.key.remoteJid, {
                            text: `🎉 *Shadow Bot conectado exitosamente.*\nUsa \`${global.prefix}help\` o \`${global.prefix}menu\` para comenzar.`,
                            quoted: msg
                        });
                        break;

                    case "close": {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode || lastDisconnect?.error?.output?.statusCode;

                        const eliminarSesion = () => {
                            if (fs.existsSync(sessionPath)) {
                                fs.rmSync(sessionPath, { recursive: true, force: true });
                            }
                        };

                        if (reason === DisconnectReason.badSession || reason === DisconnectReason.loggedOut) {
                            console.error("⚠️ Sesión eliminada. Reconéctate.");
                            eliminarSesion();
                            await conn.sendMessage(msg.key.remoteJid, {
                                text: "⚠️ *Sesión eliminada.* Usa \`${global.prefix}serbot\` para volver a conectar.",
                                quoted: msg
                            });
                        } else if (reason === DisconnectReason.restartRequired && reconnectionAttempts < maxReconnectionAttempts) {
                            console.log("🔄 Reconexión requerida. Intentando nuevamente...");
                            reconnectionAttempts++;
                            await sleep(3000);
                            await serbot();
                        } else {
                            console.error("❌ Reintentos de conexión fallidos.");
                            await conn.sendMessage(msg.key.remoteJid, {
                                text: "⚠️ *Error crítico.* No se pudo reconectar.",
                                quoted: msg
                            });
                        }
                        break;
                    }
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
