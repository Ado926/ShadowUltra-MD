import fetch from 'node-fetch';

const API_KEY = 'da46e701951af5d237fcaec07945b6ce'; // Clave de OpenWeatherMap

let handler = async (m, { conn, args }) => {
    const ciudad = args.join(' '); // Obtiene la ciudad desde los argumentos del usuario

    if (!ciudad) {
        await conn.reply(m.chat, '❄️ Por favor, ingresa el nombre de una ciudad. Ejemplo: .clima Tokio', m);
        return;
    }

    try {
        // Llamada a la API de OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`;
        const response = await fetch(url);
        const data = await response.json();

        // Verificar si la ciudad existe
        if (data.cod !== 200) {
            await conn.reply(m.chat, `⚠️ No encontré información sobre *${ciudad}*. Verifica que el nombre esté bien escrito.`, m);
            return;
        }

        // Formatear la respuesta del clima
        const climaMensaje = `
🌍 Ciudad: *${data.name}, ${data.sys.country}*
🌡️ Temperatura: *${data.main.temp}°C*
☁️ Estado del clima: *${data.weather[0].description}*
💨 Velocidad del viento: *${data.wind.speed} m/s*
🌅 Hora de amanecer: *${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}*
🌇 Hora de atardecer: *${new Date(data.sys.sunset * 1000).toLocaleTimeString()}*
`;

        await conn.reply(m.chat, climaMensaje, m);
    } catch (error) {
        console.error('Error al obtener el clima:', error.message);
        await conn.reply(m.chat, '❄️ Hubo un error al obtener la información del clima. Inténtalo más tarde.', m);
    }
};

handler.help = ['clima <ciudad>'];
handler.tags = ['info', 'weather'];
handler.command = ['clima', 'weather']; // Comandos disponibles

export default handler;
