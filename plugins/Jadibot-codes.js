import { 
  useMultiFileAuthState, 
  fetchLatestBaileysVersion, 
  makeCacheableSignalKeyStore, 
  default as makeWASocket // Importación correcta de makeWASocket
} from '@whiskeysockets/baileys';
import fs from "fs";
import pino from "pino";

let handler = async (m, { conn: _conn, args }) => {
    console.log("📥 Comando recibido: code");

    async function serbot() {
        try {
            console.log("🔄 Intentando conectar subbot...");
            let authFolderB = m.sender.split('@')[0];
            const userFolderPath = `./ShadowJadiBot/${authFolderB}`;

            // Crear carpeta de credenciales si no existe
            if (!fs.existsSync(userFolderPath)) {
                console.log("📁 Creando carpeta de credenciales...");
                fs.mkdirSync(userFolderPath, { recursive: true });
            }

            const { state, saveCreds } = await useMultiFileAuthState(userFolderPath); // Asegurando credenciales
            const { version } = await fetchLatestBaileysVersion();

            const connOptions = {
                logger: pino({ level: "silent" }),
                browser: ["Shadow Bot", "Chrome", "20.0.04"],
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
                },
                version
            };

            console.log("📶 Inicializando conexión...");
            const conn = makeWASocket(connOptions); // Conexión inicializada correctamente

            if (!state.creds.registered) {
                console.log("🔑 Generando código de emparejamiento...");
                let cleanedNumber = m.sender.split('@')[0].replace(/[^0-9]/g, ''); // Asegurar número limpio
                let codeBot = await conn.requestPairingCode(cleanedNumber); // Generar código de emparejamiento
                console.log("Código generado:", codeBot);
                codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot; // Formatear código para mejor visibilidad

                const videoUrl = "https://files.catbox.moe/mjpong.mp4"; // Enlace del video
                console.log("🎥 Enviando video tutorial...");
                await _conn.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    caption: `🎥 *Tutorial de conexión:*\n💡 Usa el siguiente código para conectarte como subbot:\n\`\`\`${codeBot}\`\`\``,
                    gifPlayback: true
                }, { quoted: m });
            } else {
                console.log("✅ Conexión ya establecida.");
                await _conn.reply(m.chat, "🌟 ¡Conexión establecida con éxito!", m);
            }

        } catch (error) {
            console.error("❌ Error en serbot:", error.message);
            await _conn.reply(m.chat, `⚠️ Error inesperado: ${error.message}`, m); // Mensaje en caso de error
        }
    }

    await serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'serbot code'];
handler.rowner = false;
handler.register = false;

export default handler;
