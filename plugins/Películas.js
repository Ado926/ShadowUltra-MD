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
        const movies = data.data; // Aquí está la lista real

        if (!movies || movies.length === 0) {
            return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);
        }

        const movie = movies[0];
        const title = movie.title || "Título desconocido";
        const year = movie.release_date ? movie.release_date.split('-')[0] : "Año desconocido";
        const rating = movie.vote_average || "N/A";
        const poster = movie.image || movie.poster_path || null;
        const description = movie.overview || "Sin descripción.";

        const responseMessage = `
🎬 *Película encontrada:*
🎥 *Título:* ${title}
📅 *Año:* ${year}
⭐ *Calificación:* ${rating}
📄 *Descripción:* ${description}
`;

        if (poster) {
            await conn.sendMessage(m.chat, {
                image: { url: poster },
                caption: responseMessage
            });
        } else {
            conn.reply(m.chat, responseMessage, m);
        }

    } catch (error) {
        console.error("Error en la búsqueda:", error.message);
        conn.reply(m.chat, `❌ Error al buscar la película: ${error.message}`, m);
    }
};

handler.command = ["películas"];
export default handler;
