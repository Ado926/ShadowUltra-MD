let handler = async (m, { conn, args }) => {
    const characterName = args.join(' ').toLowerCase().trim(); // Obtiene el nombre del personaje desde los argumentos

    // Base de datos de personajes directamente en el código
    const characters = [
        {
            name: "Aika Sano",
            gender: "Mujer",
            value: "2000",
            source: "Ane wa Yanmama Junyuu-chuu",
            img: [
                "https://qu.ax/AgFoz.jpg",
                "https://qu.ax/ERAVo.jpg",
                "https://qu.ax/kyqxu.jpg"
            ],
            vid: [
                "https://files.catbox.moe/fyd68k.mp4",
                "https://files.catbox.moe/l2txfh.mp4"
            ],
            user: null,
            status: "Libre",
            votes: 0
        },
        {
            name: "Mariya Mikhailovna Kujou",
            gender: "Mujer",
            value: "1700",
            source: "Roshidere",
            img: [
                "https://qu.ax/mxYOb.jpg",
                "https://qu.ax/LpTBD.jpg",
                "https://qu.ax/nqcqy.jpg"
            ],
            vid: [
                "https://qu.ax/BRMGc.mp4",
                "https://qu.ax/zRjHm.mp4"
            ],
            user: null,
            status: "Libre",
            votes: 0
        },
        {
            name: "Umaru Doma",
            gender: "Mujer",
            value: "1000",
            source: "Himouto! Umaru-chan",
            img: [
                "https://files.catbox.moe/8e24l4.jpg",
                "https://files.catbox.moe/8dnp1r.jpg",
                "https://files.catbox.moe/bhvatf.jpg"
            ],
            vid: [
                "https://files.catbox.moe/8e24l4.mp4",
                "https://files.catbox.moe/8dnp1r.mp4"
            ],
            user: null,
            status: "Libre",
            votes: 0
        }
    ];

    try {
        // Buscar el personaje por nombre
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
