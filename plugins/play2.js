import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, "❕️ *¿QUÉ CANCIÓN O VIDEO QUIERES BUSCAR?*", m);
    }

    // Buscar el video en YouTube usando una API pública
    const searchUrl = `https://yt-api-fetch.vercel.app/search?q=${encodeURIComponent(text)}`;
    
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (!data || !data.results || data.results.length === 0) {
            return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);
        }

        // Seleccionar el primer resultado
        const video = data.results[0];
        const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
        const thumbnail = video.thumbnail;

        // Mensaje estructurado con imagen y detalles
        const responseMessage = `
🎶 Tú .play2 ${text}
🌸 *FELÍZ A TU LADO*
🎤 ${video.title}
📌 Duración: ${video.duration}
📺 Canal: ${video.channelTitle}
🔗 [Ver en YouTube](${videoUrl})
`;

        // Enviar mensaje con imagen
        await conn.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: responseMessage
        });

        // Enviar el video
        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: `Aquí tienes el video de *${video.title}* 🎶`
        });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, "❌ Error al buscar el video.", m);
    }
};

handler.command = ["play2"];
export default handler;
