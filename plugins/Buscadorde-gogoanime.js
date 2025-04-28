import fetch from 'node-fetch';

const handler = async (m, { text, args }) => {
    // Validar que el usuario ingresó una consulta de búsqueda
    if (!args.length) {
        return m.reply('*[❗] Uso correcto: .gogosearch <nombre del anime>*');
    }

    const query = args.join(' ').trim();
    const url = `https://gogoanime.by/api/v1/search?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Verificar si hay resultados
        if (!data || data.length === 0) {
            return m.reply(`*[❗] No se encontraron resultados para:* "${query}"`);
        }

        // Construir el mensaje con los resultados
        let message = `🔎 *Resultados de búsqueda para:* "${query}"\n\n`;
        data.slice(0, 5).forEach((anime, index) => {
            message += `📌 *${anime.title}*\n🔗 ${anime.url}\n\n`;
        });

        await m.reply(message);
    } catch (error) {
        console.error('Error en la búsqueda:', error.message);
        return m.reply('*[❗] Hubo un error al buscar el anime en Gogoanime.*');
    }
};

handler.command = /^gogosearch$/i;
export default handler;
