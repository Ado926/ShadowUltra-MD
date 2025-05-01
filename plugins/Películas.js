Espero si funcione Bro voy a colocar el Code 

import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, "❕️ *¿QUÉ PELÍCULA QUIERES BUSCAR?*", m);
    }

    // URL de búsqueda en la API de películas
    const searchUrl = `https://nightapioficial.onrender.com/api/movies/search?query=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(searchUrl);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.movies || data.movies.length === 0) {
            return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);
        }

        // Seleccionar la primera película encontrada
        const movie = data.movies[0];
        const title = movie.title;
        const year = movie.year;
        const rating = movie.rating || "N/A";
        const poster = movie.poster;
        const description = movie.description || "No disponible.";

        // Formatear el mensaje de respuesta
        const responseMessage = `
🎬 *Película encontrada:*
🎥 *Título:* ${title}
📅 *Año:* ${year}
⭐ *Calificación:* ${rating}
📄 *Descripción:* ${description}
`;

        // Enviar mensaje con imagen
        await conn.sendMessage(m.chat, {
            image: { url: poster },
            caption: responseMessage
        });

    } catch (error) {
        console.error("Error en la búsqueda:", error.message);
        conn.reply(m.chat, `❌ Error al buscar la película: ${error.message}`, m);
    }
};

handler.command = ["películas"];
export default handler;
