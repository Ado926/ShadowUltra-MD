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

        if (!image) throw '*[❗] ERROR AL SUBIR LA IMAGEN*';

        try {
            const anime = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${image}`;
            console.log("Intentando con LolHuman API:", anime);
            await conn.sendFile(m.chat, anime, 'resultado.jpg', '*Imagen convertida a anime*', m);
        } catch (i) {
            console.error("Error con LolHuman API:", i.message);
            try {
                const anime2 = `https://api.zahwazein.xyz/photoeditor/jadianime?url=${image}&apikey=${keysxxx}`;
                console.log("Intentando con Zahwazein API:", anime2);
                await conn.sendFile(m.chat, anime2, 'resultado.jpg', '*Imagen convertida a anime*', m);
            } catch (a) {
                console.error("Error con Zahwazein API:", a.message);
                try {
const anime3 = `https://api.caliph.biz.id/api/animeai?img=${image}&apikey=caliphkey`;
                    console.log("Intentando con Caliph API:", anime3);
                    await conn.sendFile(m.chat, anime3, 'resultado.jpg', ' _Imagen convertida a anime_ ', m);
                } catch (errorFinal) {
                    console.error("Error en todas las API:", errorFinal.message);
                    conn.reply(m.chat, ' _[❗] ERROR AL PROCESAR LA IMAGEN EN LAS APIS_ ', m);
                }
            }
        }
    } catch (error) {
        console.error("Error general:", error.message);
        conn.reply(m.chat, `*[❗] ERROR GENERAL: ${error.message}*`, m);
    }
};

handler.command = /^animeconvert$/i;
export default handler;
