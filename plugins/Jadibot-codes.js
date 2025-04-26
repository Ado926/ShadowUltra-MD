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
    const bot = global.db.data.settings[conn.user.jid] || {};

    if (!bot.jadibotmd) return m.reply('⚠️ Este comando está desactivado por el creador.');

    let parent = args[0] && args[0] === 'plz' ? _conn : await global.conn;

    async function serbot() {
        let authFolderB = m.sender.split('@')[0];
        const userFolderPath = `./ShadowJadiBot/${authFolderB}`;

        // Crear carpeta de credenciales si no existe
        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath, { recursive: true });
        }

        args[0] ? fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : "";

        const { state, saveState, saveCreds } = await useMultiFileAuthState(userFolderPath);
        const msgRetryCounterMap = (MessageRetryMap) => {};
        const msgRetryCounterCache = new NodeCache();
        const { version } = await fetchLatestBaileysVersion();
        let phoneNumber = m.sender.split('@')[0];

        const methodCodeQR = process.argv.includes("qr");
        const methodCode = !!phoneNumber || process.argv.includes("code");

        const connectionOptions = {
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            browser: ["Shadow Bot", "Chrome"],
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
            },
            markOnlineOnConnect: true,
            generateHighQualityLinkPreview: true,
            msgRetryCounterCache,
            msgRetryCounterMap,
            version
        };

        let conn = makeWASocket(connectionOptions);

        if (methodCode && !conn.authState.creds.registered) {
            if (!phoneNumber) process.exit(0);
            let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
            setTimeout(async () => {
                let codeBot = await conn.requestPairingCode(cleanedNumber);
                codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;

                const videoUrl = "https://example.com/tutorial.mp4"; // Cambia esta URL a tu video
                await parent.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    caption: `🎥 *Tutorial de conexión:*\n💡 Usa el código a continuación para conectarte como subbot.\n\`\`\`${codeBot}\`\`\`\n✅ *Recuerda:* Este código solo funciona en el número donde fue solicitado.`,
                    gifPlayback: true
                }, { quoted: m });

                await parent.reply(m.chat, "✅ ¡Código enviado junto con el tutorial en video!", m);
            }, 3000);
        }

        setInterval(async () => {
            if (!conn.user) {
                try {
                    conn.ws.close();
                } catch {}
                conn.ev.removeAllListeners();
                let i = global.conns.indexOf(conn);
                if (i < 0) return;
                delete global.conns[i];
global.conns.splice(i, 1);
            }
        }, 60000);

        conn.ev.on("connection.update", async ({ connection }) => {
            if (connection === "open") {
                global.conns.push(conn);
                await parent.reply(m.chat, "🌟 Subbot conectado exitosamente.", m);
            }
        });

        conn.ev.on("creds.update", saveCreds);
    }

    serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'Code', 'serbot code'];
handler.rowner = false;
handler.register = false;

export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
      }
