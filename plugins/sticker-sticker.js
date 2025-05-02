import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 10) return m.reply(`[ ⚠️ ] El video no puede durar más de 10 segundos`);

      let img?.();
      if (!img) return conn.reply(m.chat, `*[ ℹ️ ] Responde al video o imagen con el comando*`, m);

      let out;
      try {
        stiker = await sticker(img, false, global.packsticker, global.authsticker);
      } catch (e) {
        console.error(e);
      } finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img);
          else if (/image/g.test(mime)) out = await uploadImage(img);
          else if (/video/g.test(mime)) out = await uploadFile(img);
          if (typeof out !== 'string') out = await uploadImage(img);
          stiker = await sticker(false, out, global.packsticker, global.authsticker);
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packsticker, global.authsticker);
      else return m.reply(`*[ ⚠️ ] El URL es incorrecto*`);
    }
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) {
      // Enviar la imagen antes del sticker con el mensaje correcto
      await conn.sendMessage(m.chat, { 
        image: { url: 'https://files.catbox.moe/08fo9q.jpg' }, 
        caption: 'Aquí está tu imagen junto al mensaje!' 
      });

      // Enviar el sticker
      await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { 
        contextInfo: { 
          'forwardingScore': 200, 
          'isForwarded': false, 
          externalAdReply: { 
            showAdAttribution: false, 
            title: 'Տһ͟ᥲ֟፝ძ᥆ϣ Ϟ S𝗍іᥴkᥱr ☕', 
            body: `Shadow Bot MD`, 
            mediaType: 2, 
            sourceUrl: grupo, 
            thumbnail: icons
          }
        } 
      }, { quoted: m });
    } else {
      return conn.reply(m.chat, `*[ ℹ️ ] La conversión ha fallado, responde a un vídeo, imagen o GIF para convertirlo en sticker.*`, m, rcanal);
    }
  }
}

handler.help = ['sticker'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi')));
};
