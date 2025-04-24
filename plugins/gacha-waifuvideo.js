let handler = async (m, { conn, args }) => {
    const characterName = args.join(' ').toLowerCase().trim(); // Obtiene el nombre del personaje desde los argumentos

    // Base de datos de personajes directamente en el código
    const characters = [
        {
            name: "aika sano", // Convertido a minúsculas
            gender: "Mujer",
            value: "2000",
            source: "Ane wa Yanmama Junyuu-chuu",
            img: [
                "https://files.catbox.moe/4ea1lz.jpg",
                "https://files.catbox.moe/4g2twd.jpg",
                "https://files.catbox.moe/4g2twd.jpg"
            ],
            vid: [
                "https://files.catbox.moe/vsm42i.mp4",
                "https://files.catbox.moe/gqb6pn.mp4",
                "https://files.catbox.moe/a0ay0u.mp4" // URL adicional
            ],
            user: null,
            status: "Libre",
            votes: 0
        },
        {
            name: "mariya mikhailovna kujou", // Convertido a minúsculas
            gender: "Mujer",
            value: "1700",
            source: "Roshidere",
            img: [
                "https://qu.ax/mxYOb.jpg",
                "https://qu.ax/r2dJc.jpg"
            ],
            vid: [
                "https://files.catbox.moe/rj2tqv.mp4",
                "https://files.catbox.moe/extraMariya.mp4" // URL adicional
            ],
            user: null,
            status: "Libre",
            votes: 0
        },
        {
            name: "rem", // Personaje añadido
            gender: "Mujer",
            value: "2500",
            source: "Re:Zero",
            img: [
                "https://files.catbox.moe/15pfw9.jpg",
                "https://files.catbox.moe/jb7jss.jpg"
            ],
            vid: [
                "https://files.catbox.moe/8t3fsz.mp4",

"https://files.catbox.moe/nsp6d2.mp4",
                "https://files.catbox.moe/wuchhp.mp4" // URL adicional
            ],
            user: null,
            status: "Libre",
            votes: 0
        }
    ];

    // Buscar el personaje en la base de datos
    const character = characters.find(c => c.name === characterName);

    if (!character) {
        await conn.reply(m.chat, `⚠️ No se ha encontrado el personaje *${args.join(' ')}*. Asegúrate de que el nombre esté correcto.`, m);
        return;
    }

    // Respuesta con los datos del personaje
    const respuesta = `
✨ *${character.name}* ✨
📖 Fuente: *${character.source}*
💎 Valor: *${character.value}*
📂 Estado: *${character.status}*
`;

    // Enviar imágenes del personaje
    for (const img of character.img) {
        await conn.sendFile(m.chat, img, 'image.jpg', respuesta, m);
    }

    // Enviar videos del personaje
    for (const vid of character.vid) {
        await conn.sendFile(m.chat, vid, 'video.mp4', '', m);
    }
};

handler.help = ['character <nombre>'];
handler.tags = ['fun', 'anime'];
handler.command = ['waifuvideo', 'waifu']; // Comandos disponibles

export default handler;
