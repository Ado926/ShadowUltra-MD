import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

let pp = ''
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
//let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

//CREADOR Y OTROS
global.creador = 'Wa.me/51927238856'
global.botreal = `${(conn.user.jid == global.conn.user.jid ? 'Oficial' : 'Sub-Bot')}`
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/51927238856'
global.namech = '𝑺𝒉𝒂𝒅𝒐𝒘 𝑩𝒐𝒕 - 𝑴𝑫'
global.namechannel2 = 'ꨴ 🤍꣺ꤪ꤬꤯ꨬꨶ ̷̸̲̼̈́ Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡'
global.namegrupo = 'Group Shadow Oficial'
global.namecomu = 'Heavenly Team Community'
global.namecomu2 = '☕ Heavenly Team Community'

//REACCIONES 
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'

//EMOJIS PREDETERMINADOS
global.emoji = '🌷'
global.emoji2 = '🤍'
global.emoji3 = '☕'
global.emoji4 = '🍨'
global.emoji5 = '🍃'
global.emojis = [emoji, emoji2, emoji3, emoji4, emoji5].getRandom()

//MENSAJE DE ESPERA 
global.wait = '[ ⏳ ] *Aɢᴜᴀʀᴅᴇ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ...*';

//ENLACES
var grupo = 'https://chat.whatsapp.com/FCS6htvAmlT7nq006lxU4I'  
var github = 'https://github.com/CrxstianEscobar/ShadowBot-MD' 
var web = 'https://shadow-bot.vercel.app/' 
let instagram = 'https://www.instagram.com/shadowbot.md'

global.redes = [grupo, github, web, instagram].getRandom()

//IMAGEN
let category = "imagen"
const db = './media/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

//TIEMPO
var ase = moment().tz('America/Lima'); // Cambia 'America/Lima' por la zona horaria deseada
var hour = ase.hour(); // Obtiene la hora en la zona horaria elegida

switch(hour) { 
    case 0: case 1: case 2:
        hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; 
        break;
    case 3: case 4: case 5: case 6:
        hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; 
        break;
    case 7:
        hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅'; 
        break;
    case 8: case 9:
        hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; 
        break;
    case 10: case 11: case 12: case 13:
        hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; 
        break;
    case 14: case 15: case 16: case 17:
        hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ xD'; 
        break;
    case 18: case 19: case 20: case 21: case 22: case 23:
        hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; 
        break;
}

global.saludo = hour;


//TAGS & STICKERS
global.nombre = conn.getName(m.sender)
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

global.authsticker = `\n\n☕ Bᴏᴛ:\n↳お 𝑺𝒉𝒂𝒅𝒐𝒘 𝑩𝒐𝒕 - 𝑴𝑫\n\n🍨 Usᴜᴀʀɪᴏ:\n↳@${conn.getName(m.sender)}`;

global.packsticker = `ꨴ 🤍꣺ꤪ꤬꤯ꨬꨶ ̷̸̲̼̈́ Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡\n↳@heavenly_team\n\n👹 Iɴғᴏ:\n↳Wa.me/51927238856`

//FAKES
global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363318267632676@newsletter', newsletterName: "˚₊·͟͟͟͟͟͟͞͞͞͞͞͞➳❥ ꒰  HEAVENLY TEAM ꒱ | ೃ࿔₊•", serverMessageId: -1 }
}}, { quoted: m }

//ID CANALES
global.idchannel = '120363357231409846@newsletter'
global.canalIdM = ["120363357231409846@newsletter", "120363357231409846@newsletter", "120363357231409846@newsletter"]
global.canalNombreM = ["⏤͟͟͞͞Shadow۵࿐", "✯ SB - Chanel ✯", "⏤͟͟͞͞☆ Shadow Test"]
global.channelRD = await getRandomChannel()
// global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "3876577197-120363302285079181@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: `${packname}`, orderTitle: 'Bang', thumbnail: icons, sellerJid: '0@s.whatsapp.net'}}}

global.icono = [
'https://files.catbox.moe/uho7vk.jpg',
'https://files.catbox.moe/u1sgph.jpg',
'https://files.catbox.moe/pk3xxk.jpg',
'https://files.catbox.moe/yljhz1.jpg',
'https://files.catbox.moe/qze4u2.jpg',
'https://files.catbox.moe/gc6b94.jpg',
].getRandom()

global.urls = [
"https://qu.ax/vnPMj.mp4",
"https://qu.ax/vnPMj.mp4",
];
let gifUrl = urls[Math.floor(Math.random() * urls.length)];

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name, }, externalAdReply: { showAdAttribution: true, title: textbot, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, }, }}

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
  }

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdM.length)
let id = canalIdM[randomIndex]
let name = canalNombreM[randomIndex]
return { id, name }
}         