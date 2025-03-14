/*import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
var handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/kgzBh.jpg')
let { premium, level, cookies, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[m.sender]
let username = conn.getName(who)
let noprem = `
ˏˋ───･ ｡ﾟ☆: *.☽.* :☆ﾟ｡ ･───ˊˎ
ㅤㅤ *\`𝐏𝐄𝐑𝐅𝐈𝐋 𝐃𝐄𝐋 𝐔𝐒𝐔𝐀𝐑𝐈𝐎\`*

👤 *Nombre:* ${username}
🏷️ *Tag:* @${who.replace(/@.+/, '')}
💌 *Registrado:* ${registered ? '✅': '❌'}
🧃 *Premium:* ${premium ? '✅': '❌'}

╭─• *\`𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒\`*
│ *🪙 Coins:* 15
│ *🍨 Nivel:* ${level}
│ *🌷 Xp:* ${exp}
│ *☕ Rango:* ${role}
╰─────────────•

> By Shadow Bot MD
`.trim()
let prem = `╭─⪩ 𓆩 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𓆪
│⧼👤⧽ *Usᴜᴀʀɪᴏ:* ${username}
│⧼💌⧽ *Rᴇɢɪsᴛʀᴀᴅᴏ:* ${registered ? '✅': '❌'}
│⧼🔱⧽ *Rᴏʟ:* Vip 👑
╰─────────────⪩

╭─⪩ 𓆩 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 𓆪
│⧼🍪⧽ *Cᴏɪɴs:* 30
│⧼🔰⧽ *Nɪᴠᴇʟ:* ${level}
│⧼💫⧽ *Xᴘ:* ${exp}
│⧼⚜️⧽ *Rᴀɴɢᴏ:* ${role}
╰─────────────⪩`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.register = true
handler.group = false
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler*/

import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

// Función para convertir código de país a emoji de bandera
const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '🏳️'; // Bandera blanca si no se detecta
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
};

var handler = async (m, { conn }) => {
    let who = m.mentionedJid && m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.fromMe 
        ? conn.user.jid 
        : m.sender;

    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/kgzBh.jpg');
    let { premium, level, cookies, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[m.sender];
    let username = conn.getName(who);

    // Detectar país y convertir a emoji de bandera
    let countryCode = 'Desconocido';
    let flag = '🏳️'; // Bandera blanca por defecto
    let phone = PhoneNumber(who.split('@')[0]);
    if (phone.isValid()) {
        countryCode = phone.getRegionCode() || 'Desconocido';
        flag = getFlagEmoji(countryCode);
    }

    let noprem = `
ˏˋ───･ ｡ﾟ☆: *.☽.* :☆ﾟ｡ ･───ˊˎ
ㅤㅤ *\`𝐏𝐄𝐑𝐅𝐈𝐋 𝐃𝐄𝐋 𝐔𝐒𝐔𝐀𝐑𝐈𝐎\`*

👤 *Nombre:* ${username}
🌍 *País:* ${flag}
🏷️ *Tag:* @${who.replace(/@.+/, '')}
💌 *Registrado:* ${registered ? '✅' : '❌'}
🧃 *Premium:* ${premium ? '✅' : '❌'}

╭─• *\`𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒\`*
│ *🪙 Coins:* 15
│ *🍨 Nivel:* ${level}
│ *🌷 Xp:* ${exp}
│ *☕ Rango:* ${role}
╰─────────────•

> By Shadow Bot MD`.trim();

    let prem = `╭─⪩ 𓆩 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𓆪
│⧼👤⧽ *Usuario:* ${username}
│⧼🌍⧽ *País:* ${flag}
│⧼💌⧽ *Registrado:* ${registered ? '✅' : '❌'}
│⧼🔱⧽ *Rol:* Vip 👑
╰─────────────⪩

╭─⪩ 𓆩 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 𓆪
│⧼🍪⧽ *Coins:* 30
│⧼🔰⧽ *Nivel:* ${level}
│⧼💫⧽ *Xp:* ${exp}
│⧼⚜️⧽ *Rango:* ${role}
╰─────────────⪩`.trim();

    conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem : noprem}`, m, { mentions: [who] });
}

handler.help = ['profile'];
handler.register = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;