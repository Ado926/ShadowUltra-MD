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
                return conn.reply(m.chat, `⚠️ *Responde a una imagen o video para crear el sticker* ⚠️`, m);
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
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
                contextInfo: {
                    forwardingScore: 200,
                    isForwarded: false,
                    externalAdReply: {
                        showAdAttribution: false,
                        title: "NagiBot By Bryan",
                        body: "Únete al canal oficial",
                        mediaType: 2,
                        sourceUrl: "https://whatsapp.com/channel/0029VbAXuUtB4hdYWC6m2R1h", // Enlace del canal agregado
                        thumbnail: icons
                    }
                }
            }, { quoted: m });
        } else {
            return conn.reply(m.chat, "⚠️ `*Responde a una imagen o video para crear el sticker*` ⚠️", m);
        }
    }
}

handler.help = ["stiker <img>", "sticker <url>"];
handler.tags = ["sticker"];
handler.group = false;
handler.register = true;
handler.command = ["s", "sticker", "stiker"];

export default handler;

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, "gi"));
};
