import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, "❕️ *¿QUÉ CANCIÓN O VIDEO QUIERES BUSCAR?*", m);
    }

    const searchUrl = `https://yt-api-fetch.vercel.app/search?q=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(searchUrl);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data); // Log para depuración

        if (!data || !data.results || data.results.length === 0) {
            return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);
        }

        const video = data.results[0];
        const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
        const thumbnail = video.thumbnail;

        const responseMessage = `
🎶 Tú .play2 ${text}
🌸 *FELÍZ A TU LADO*
🎤 ${video.title}
📌 Duración: ${video.duration}
📺 Canal: ${video.channelTitle}
🔗 [Ver en YouTube](${videoUrl})
`;

        await conn.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: responseMessage
        });

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: `Aquí tienes el video de *${video.title}* 🎶`
        });

    } catch (error) {
        console.error("Error en la búsqueda:", error.message);
        conn.reply(m.chat, `❌ Error al buscar el video: ${error.message}`, m);
    }
};

handler.command = ["play2"];
export default handler;
