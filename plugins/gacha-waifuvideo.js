import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json'; // Ruta al archivo characters.json
const haremFilePath = './src/database/harem.json'; // Ruta al archivo harem.json

// Función para cargar los personajes desde el archivo JSON
async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data); // Convertir los datos en un objeto JavaScript
    } catch (error) {
        console.error('Error al cargar characters.json:', error.message); // Log del error en la consola
        throw new Error('❀ No se pudo cargar el archivo characters.json.');
    }
}

// Función para cargar el harem desde el archivo JSON
async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data); // Convertir los datos en un objeto JavaScript
    } catch (error) {
        console.warn('Advertencia: harem.json no se cargó. Se utilizará una lista vacía.');
        return [];
    }
}

let handler = async (m, { conn, args }) => {
    const characterName = args.join(' ').toLowerCase().trim(); // Obtiene el nombre del personaje desde los argumentos

    try {
        // Cargar los personajes desde el archivo
        const characters = await loadCharacters();
        const character = characters.find(c => c.name.toLowerCase() === characterName);

        // Verificar si el personaje existe
        if (!character) {
            await conn.reply(m.chat, `《✧》No se ha encontrado el personaje *${characterName}*. Asegúrate de que el nombre esté correcto.`, m);
            return;
        }

        // Seleccionar un video aleatorio del personaje
        const randomVideo = character.vid[Math.floor(Math.random() * character.vid.length)];

        const message = `❀ Nombre » *${character.name}*
⚥ Género » *${character.gender}*
❖ Fuente » *${character.source}*`;

        // Enviar el video al chat
        await conn.sendFile(m.chat, randomVideo, `${character.name}.mp4`, message, m);
    } catch (error) {
        console.error('Error al ejecutar waifuvideo:', error.message); // Log detallado en la consola
        await conn.reply(m.chat, `✘ Error al cargar el video del personaje: ${error.message}`, m);
    }
};

handler.help = ['waifuvideo <nombre del personaje>'];
handler.tags = ['anime'];
handler.command = ['waifuvideo', 'wvideo', 'charvideo', 'cvideo']; // Comandos disponibles
handler.group = true;
handler.register = true;

export default handler;
