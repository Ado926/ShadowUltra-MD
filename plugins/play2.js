import fetch from 'node-fetch';

const YOUTUBE_API_KEY = 'AIzaSyDxSl-YLDFDHDmLzaFWEVrYAzn7EihCYJA'; // Clave API de YouTube

const handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, "❕️ *¿QUÉ CANCIÓN O VIDEO QUIERES BUSCAR?*", m);
    }

    // URL de búsqueda en YouTube utilizando la API oficial
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(text)}&maxResults=1&key=${YOUTUBE_API_KEY}`;

    try {
        const response = await fetch(searchUrl);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data); // Log para depuración

        if (!data.items || data.items.length === 0) {
            return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);
        }

        const video = data.items[0];
        const videoId = video.id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const thumbnail = video.snippet.thumbnails.high.url;
        const title = video.snippet.title;
        const channel = video.snippet.channelTitle;

        const responseMessage = `
🎶 Tú .play2 ${text}
🌸 *FELÍZ A TU LADO*
🎤 ${title}
📺 Canal: ${channel}
🔗 [Ver en YouTube](${videoUrl})
`;

        // Enviar mensaje con imagen
        await conn.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: responseMessage
        });

        // Enviar el enlace del video en vez de descargarlo
        await conn.sendMessage(m.chat, {
            text: `Aquí tienes el video de *${title}* 🎶\n🔗 ${videoUrl}`
        });

    } catch (error) {
        console.error("Error en la búsqueda:", error.message);
        conn.reply(m.chat, `❌ Error al buscar el video: ${error.message}`, m);
    }
};

handler.command = ["play2"];
export default handler;
