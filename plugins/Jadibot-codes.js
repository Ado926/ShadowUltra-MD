const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  MessageRetryMap,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} = await import('@whiskeysockets/baileys');
import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import readline from 'readline';
import qrcode from "qrcode";
import crypto from 'crypto';
import fs from "fs";
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws;
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
    console.log("Comando recibido:", command);

    const bot = global.db.data.settings[conn.user.jid] || {};
    if (!bot.jadibotmd) return m.reply('⚠️ Este comando está desactivado por el creador.');

    let parent = args[0] && args[0] === 'plz' ? _conn : await global.conn;

    async function serbot() {
        try {
            console.log("🔄 Intentando conectar subbot...");
            let authFolderB = m.sender.split('@')[0];
            const userFolderPath = `./ShadowJadiBot/${authFolderB}`;

            // Validar y crear carpeta de credenciales
            if (!fs.existsSync(userFolderPath)) {
                console.log("📁 Creando carpeta de credenciales...");
                fs.mkdirSync(userFolderPath, { recursive: true });
            }

            if (args[0]) {
                console.log("📜 Guardando credenciales...");
                fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t'));
            }

            const { state, saveCreds } = await useMultiFileAuthState(userFolderPath);
            const { version } = await fetchLatestBaileysVersion();

            const connectionOptions = {
                logger: pino({ level: 'silent' }),
                printQRInTerminal: false,
                browser: ["Shadow Bot", "Chrome", "20.0.04"],
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
                },
                version
            };

            console.log("📶 Inicializando conexión...");
            let conn = makeWASocket(connectionOptions);

            if (conn.authState.creds.registered) {
                console.log("✅ Subbot conectado exitosamente.");
                await parent.reply(m.chat, '🌟 ¡Conexión establecida con éxito!', m);
            } else {
                console.log("🔑 Generando código de emparejamiento...");
                let cleanedNumber = m.sender.split('@')[0].replace(/[^0-9]/g, '');
                let codeBot = await conn.requestPairingCode(cleanedNumber);
                codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;

                const videoUrl = "https://files.catbox.moe/mjpong.mp4"; // Reemplaza con tu enlace de video
                await parent.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    caption: `🎥 *Tutorial de conexión:*\n\n💬 Usa el código de abajo para conectarte como subbot. \n💡 ¡Recuerda que el código solo funciona en el número solicitado!`,
                    gifPlayback: true
                }, { quoted: m });

                await parent.reply(m.chat, `📝 Tu código de conexión:\n\`\`\`${codeBot}\`\`\``, m);
            }

        } catch (error) {
            console.error("❌ Error en serbot:", error.message);
            await parent.reply(m.chat, `⚠️ Error inesperado: ${error.message}`, m);
        }
    }

    serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
