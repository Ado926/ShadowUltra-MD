import fetch from 'node-fetch';

const handler = async (m, { text, args }) => {
    if (!args.length) {
        return m.reply('*[❗] Uso correcto: .animeplus <nombre del anime>*');
    }

    const query = args.join(' ').trim();
    const url = `https://freewebapi.com/api/anime/search?query=${encodeURIComponent(query)}`; // URL de la API de FreeWebApi Anime

    try {
        const response = await fetch(url);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Verificar si hay resultados
        if (!data || data.length === 0) {
            return m.reply(`*[❗] No se encontraron resultados para:* "${query}"`);
        }

        // Construir el mensaje con los resultados
        let message = `🔎 *Resultados de búsqueda para:* "${query}"\n\n`;
        data.slice(0, 5).forEach((anime) => {
            message += `📌 *${anime.title}*\n🎥 *Video:* ${anime.videoUrl || 'No disponible'}\n🔗 ${anime.url}\n\n`;
        });

        await m.reply(message);
    } catch (error) {
        console.error('Error en la búsqueda:', error.message);
        return m.reply('*[❗] Hubo un error al buscar el anime en FreeWebApi.*');
    }
};

handler.command = /^animeplus$/i;
export default handler;
