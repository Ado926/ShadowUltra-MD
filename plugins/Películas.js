import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, "❕️ *¿QUÉ PELÍCULA QUIERES BUSCAR?*", m);
    }

    const searchUrl = `https://nightapioficial.onrender.com/api/movies/search?query=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Ajuste aquí: validación de `data.data`
        if (!data || !data.data || data.data.length === 0) {
            return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);
        }

        const movie = data.data[0];
        const title = movie.title || "Sin título";
        const year = movie.release_date?.split("-")[0] || "Año desconocido";
        const rating = movie.vote_average ?? "N/A";
        const poster = movie.image || "https://via.placeholder.com/300x450?text=Sin+imagen";
        const description = movie.overview || "Descripción no disponible.";

        const responseMessage = `
🎬 *Película encontrada:*
🎥 *Título:* ${title}
📅 *Año:* ${year}
⭐ *Calificación:* ${rating}
📄 *Descripción:* ${description}
`;

        await conn.sendMessage(m.chat, {
            image: { url: poster },
            caption: responseMessage.trim()
        });

    } catch (error) {
        console.error("Error en la búsqueda:", error.message);
        conn.reply(m.chat, `❌ Error al buscar la película: ${error.message}`, m);
    }
};

handler.command = ["películas"];
export default handler;
