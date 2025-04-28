import uploadImage from '../lib/uploadImage.js';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || q.mediaType || '';

        if (!/image/g.test(mime)) throw '*[❗] RESPONDA O ETIQUETE A UNA IMAGEN*';
        m.reply('*[❗] CONVIRTIENDO IMAGEN A DISEÑO ANIME...*');

        const data = await q.download?.();
        if (!data) throw '*[❗] ERROR AL DESCARGAR LA IMAGEN*';

        const image = await uploadImage(data);
        console.log("URL de la imagen subida:", image);

        try {
            const anime = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${image}`;
            await conn.sendFile(m.chat, anime, 'resultado.jpg', '*Imagen convertida a anime*', m);
        } catch (i) {
            try {
                const anime2 = `https://api.zahwazein.xyz/photoeditor/jadianime?url=${image}&apikey=${keysxxx}`;
                await conn.sendFile(m.chat, anime2, 'resultado.jpg', '*Imagen convertida a anime*', m);
            } catch (a) {
                try {
                    const anime3 = `https://api.caliph.biz.id/api/animeai?img=${image}&apikey=caliphkey`;
                    await conn.sendFile(m.chat, anime3, 'resultado.jpg', '*Imagen convertida a anime*', m);
                } catch (errorFinal) {
                    console.error("Error en todas las API:", errorFinal);
                    conn.reply(m.chat, '*[❗] ERROR AL PROCESAR LA IMAGEN EN LAS APIS*', m);
                }
            }
        }
    } catch (error) {
        console.error("Error general:", error);
        conn.reply(m.chat, `*[❗] ERROR: ${error.message}*`, m);
    }
};

handler.command = /^animeconvert$/i;
export default handler;
