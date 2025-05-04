import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false;
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';

        if (/webp|image|video/g.test(mime)) {
            if (/video/g.test(mime) && (q.msg || q).seconds > 8) {
                return m.reply("🥷 *¡El video no puede durar más de 8 segundos!*");
            }

            let img = await q.download?.();

            if (!img) {
                return conn.reply(m.chat, `🔥 *uff pero que caliente 😏* 🔥`, m);
            }

            let out;
            try {
                stiker = await sticker(img, false, global.packsticker, global.author);
            } catch (e) {
                console.error(e);
            } finally {
                if (!stiker) {
                    stiker = await sticker(false, img, global.packsticker, global.author);
                }
            }
        } else if (args[0]) {
            if (isUrl(args[0])) {
                stiker = await sticker(false, args[0], global.packsticker, global.author);
            } else {
                return m.reply(`⚠️ *El URL es incorrecto*`);
            }
        }
    } catch (e) {
        console.error(e);
        if (!stiker) stiker = e;
    } finally {
        if (stiker) {
            // Obtener imagen del grupo
            let groupPicture = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://files.catbox.moe/08fo9q.jpg'

            await conn.sendMessage(m.chat, {
                image: { url: groupPicture }, // Imagen arriba
                caption: "🕷️ *ShadowBot - Generador de Stickers* ⚡\nAquí tienes tu sticker:",
                contextInfo: {
                    forwardingScore: 200,
                    isForwarded: false,
                    externalAdReply: {
                        showAdAttribution: false,
                        title: "ShadowBot",
                        body: "Sistema de stickers basado en Shadow",
                        mediaType: 2,
                        sourceUrl: "https://whatsapp.com/channel/0029VbAXuUtB4hdYWC6m2R1h", // Canal agregado
                        thumbnail: groupPicture
                    }
                }
            });

            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            return conn.reply(m.chat, "🔥 *uff pero que caliente* 😏", m);
        }
    }
}

handler.help = ["stiker <img>", "sticker <url>"];
handler.tags = ["sticker"];
handler.group = false;
handler.register = true;
handler.command = ["teta", "sticker", "stiker"];

export default handler;

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, "gi"));
};
