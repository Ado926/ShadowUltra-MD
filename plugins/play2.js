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
            return conn.reply(m.chat, "❌ No se encontraron resultados.", m);
        }

        const video = data.items[0];
        const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        const videoTitle = video.snippet.title;

        // Enviar el enlace del video y el título
        return conn.reply(m.chat, `📹 Aquí está tu video\n🔥 Título: ${videoTitle}\n🔗 ${videoUrl}`, m);
    } catch (error) {
        console.error("Error al buscar el video:", error);
        return conn.reply(m.chat, "❌ Ocurrió un error al buscar el video.", m);
    }
};

export default handler;
