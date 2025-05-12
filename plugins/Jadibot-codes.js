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

  if (!bot.jadibotmd) return m.reply(
    '⪛✰ ↫Shadow Code ↬ ✰⪜\n\n' +
    '✐ 𝘾𝙤𝙣𝙚𝙭𝙞𝙤n 𝙑𝙞́𝙖 𝘾𝙤́𝙙𝙞𝙜𝙤 [ᴘᴏᴘᴜʟᴀʀ]\n\n' +
    '✰ Usa este Código para convertirte en un Sub-Bot Temporal.\n\n' +
    '✧ No es recomendable usar tu cuenta principal.'
  );

  let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn;

  async function serbot() {
    let authFolderB = m.sender.split('@')[0];
    const userFolderPath = `./ShadowJadiBot/${authFolderB}`;

    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    args[0] ? fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : "";

    const { state, saveState, saveCreds } = await useMultiFileAuthState(userFolderPath);
    const msgRetryCounterMap = (MessageRetryMap) => { };
    const msgRetryCounterCache = new NodeCache();
    const { version } = await fetchLatestBaileysVersion();
    let phoneNumber = m.sender.split('@')[0];

    const methodCodeQR = process.argv.includes("qr");
    const methodCode = !!phoneNumber || process.argv.includes("code");
    const MethodMobile = process.argv.includes("mobile");

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const question = (texto) => new Promise((resolver) => rl.question(texto, resolver));

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      mobile: MethodMobile,
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (clave) => {
        let jid = jidNormalizedUser(clave.remoteJid);
        let msg = await store.loadMessage(jid, clave.id);
        return msg?.message || "";
      },
      msgRetryCounterCache,
      msgRetryCounterMap,
      defaultQueryTimeoutMs: undefined,
      version
    };

    let conn = makeWASocket(connectionOptions);

    if (methodCode && !conn.authState.creds.registered) {
      if (!phoneNumber) process.exit(0);
      let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
      setTimeout(async () => {
        let codeBot = await conn.requestPairingCode(cleanedNumber);
        codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
        let txt = '⪛✰ ↫Shadow Code ↬ ✰⪜\n\n' +
                  '✐ 𝘾𝙤𝙣𝙚𝙭𝙞𝙤n 𝙑𝙞́𝙖 𝘾𝙤́𝙙𝙞𝙜𝙤 [ᴘᴏᴘᴜʟᴀʀ]\n\n' +
                  '✰ Usa este Código para convertirte en un Sub-Bot Temporal.\n\n' +
                  '✧ No es recomendable usar tu cuenta principal.';
        await parent.reply(m.chat, txt, m);
        await parent.reply(m.chat, codeBot, m);
        rl.close();
      }, 3000);
    }
    
    conn.isInit = false;

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update;
      if (isNewLogin) conn.isInit = true;
      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

      if (connection == 'open') {
        conn.isInit = true;
        global.conns.push(conn);
        await parent.reply(m.chat, args[0] ? '✅ ¡Conexión establecida con éxito!' : '🍷 𝗖𝗼𝗻𝗲𝘅𝗶𝗼́𝗻 𝗲𝘅𝗶𝘁𝗼𝘀𝗮 𝗮 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽! 🌹', m);
        await sleep(5000);
      }
    }
    
    setInterval(async () => {
      if (!conn.user) {
        try { conn.ws.close() } catch { }
        conn.ev.removeAllListeners();
        let i = global.conns.indexOf(conn);
        if (i < 0) return;
        delete global.conns[i];
        global.conns.splice(i, 1);
      }
    }, 60000);

    creloadHandler(false);
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
