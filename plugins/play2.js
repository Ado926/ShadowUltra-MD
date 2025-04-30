import fetch from 'node-fetch';

const YOUTUBE_API_KEY = 'AIzaSyDxSl-YLDFDHDmLzaFWEVrYAzn7EihCYJA'; // Clave API de YouTube

const handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, "❕️ *¿QUÉ CANCIÓN O VIDEO QUIERES BUSCAR?*", m);

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(text)}&maxResults=1&key=${YOUTUBE_API_KEY}`;

    try {
        const res = await fetch(searchUrl);
        if (!res.ok) throw new Error(`API YouTube: ${res.status} ${res.statusText}`);

        const data = await res.json();
        if (!data.items || !data.items.length) return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);

        const video = data.items[0];
        const videoId = video.id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.high.url;
        const channel = video.snippet.channelTitle;

        // Intenta con ZenZAPI
        let videoDownloadUrl;
        try {
            const zenz = await fetch(`https://zenzapi.xyz/api/downloader/ytmp4?url=${videoUrl}&apikey=zenzkey`);
            const zenzJson = await zenz.json();
            if (zenzJson.status && zenzJson.result?.url) {
                videoDownloadUrl = zenzJson.result.url;
            }
        } catch (e) {
            console.log('Fallo ZenzAPI:', e.message);
        }

        // Si Zenz no funciona, intenta con Oxy
        if (!videoDownloadUrl) {
            try {
                const oxy = await fetch(`https://api.oxy.name/api/ytmp4?url=${videoUrl}`);
                const oxyJson = await oxy.json();
                if (oxyJson.status && oxyJson.result?.url) {
                    videoDownloadUrl = oxyJson.result.url;
                }
            } catch (e) {
                console.log('Fallo Oxy:', e.message);
            }
        }

        if (!videoDownloadUrl) {
            return conn.reply(m.chat, "❌ No se pudo obtener el video. Intenta con otra búsqueda o más tarde.", m);
        }

        // Mensaje decorado con imagen
        await conn.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `
🎶 Tú .play2 ${text}
🌸 *FELÍZ A TU LADO*
🎤 ${title}
📺 Canal: ${channel}
🔗 ${videoUrl}
`}, { quoted: m });

        // Enviar el video MP4
        await conn.sendMessage(m.chat, {
            video: { url: videoDownloadUrl },
            caption: `🎬 *${title}*\n📺 Canal: ${channel}`,
            fileName: `${title}.mp4`,
            mimetype: 'video/mp4'
        }, { quoted: m });

    } catch (err) {
        console.error("Error en play2:", err);
        conn.reply(m.chat, `❌ Error al buscar o enviar el video: ${err.message}`, m);
    }
};

handler.command = ["play2"];
export default handler;
