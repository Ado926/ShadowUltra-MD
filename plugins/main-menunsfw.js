import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {

  try {
    const img = './media/menus/Menu.jpg';
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `👋🏻 ¡Hᴏʟᴀ! ${taguser}
Bɪᴇɴᴠᴇɴɪᴅᴏ ᴀʟ ᴍᴇɴᴜ *ɴsғᴡ*

\`\`\`${horaFecha}\`\`\`

𓂂𓏸  𐅹੭੭   *\`ᑲᥙsᥴᥲძ᥆rᥱs\`* 🪱 ᦡᦡ
ര ׄ⃟🪱˚ .xɴxxsᴇᴀʀᴄʜ *ᴛᴇxᴛᴏ*
ര ׄ⃟🪱˚ .xsᴇᴀʀᴄʜ *ᴛᴇxᴛᴏ*
ര ׄ⃟🪱˚ .ᴘʜsᴇᴀʀᴄʜ *ᴛᴇxᴛᴏ*
ര ׄ⃟🪱˚ .ʀ34 *ᴛᴇxᴛᴏ*

𓂂𓏸  𐅹੭੭   *\`ძᥱsᥴᥲrgᥲs\`* 🧋ᦡᦡ
ര ׄ⃟🧋˚ .xɴxxᴅʟ *ᴜʀʟ*
ര ׄ⃟🧋˚ .xᴠᴅʟ *ᴜʀʟ*
ര ׄ⃟🧋˚ .ᴘʜᴅʟ *ᴜʀʟ*

𓂂𓏸  𐅹੭੭   *\`gі𝖿s\`* 🦪 ᦡᦡ
ര ׄ⃟🦪˚ .ғᴏʟʟᴀʀ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ᴄᴏɢᴇʀ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ᴄᴏɢᴇʀ2 *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ᴘᴇɴᴇᴛʀᴀʀ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ᴀɴᴀʟ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .sᴇxᴏ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ᴠɪᴏʟᴀʀ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ʀᴜsᴀ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .sɪxɴɪɴᴇ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ᴘɪᴇs *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ᴍᴀᴍᴀᴅᴀ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ʟɪᴄᴋᴘᴜssʏ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ɢʀᴀʙʙᴏᴏʙs *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .sᴜᴄᴋʙᴏᴏʙs *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ᴄᴜᴍ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ғᴀᴘ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ᴍᴀɴᴏsᴇᴀʀ *@ᴛᴀɢ*
ര ׄ⃟🦪˚ .ʟᴇsʙɪᴀɴᴀs *@ᴛᴀɢ*

𓂂𓏸  𐅹੭੭   *\`ᥴ᥆ᥒ𝗍ᥱᥒіძ᥆\`* 🍒 ᦡᦡ
ര ׄ⃟🍒˚ .ᴘᴀᴄᴋ
ര ׄ⃟🍒˚ .ᴘᴀᴄᴋ2
ര ׄ⃟🍒˚ .ᴘᴀᴄᴋ3
ര ׄ⃟🍒˚ .ᴠɪᴅᴇᴏ᥊᥊᥊

> © mᥱᥒᥙ *ᥒs𝖿ᥕ* ᑲᥡ  ᥴrіss.᥎᥊`.trim();

    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });

await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });

  } catch {
    conn.reply(m.chat,'*[ ℹ️ ] Error al enviar el video.*\n\n${e}', m);
  }
};

handler.help = ['menunsfw']
handler.command = /^(menunsfw|comandosnsfw|menuhorny|hornymenu|labiblia|menu18|menu+18)$/i;
handler.fail = null;

export default handler;