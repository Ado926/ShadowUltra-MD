const characters = [
    {
        id: "1",
        name: "Reine Murasame",
        gender: "Mujer",
        value: 1900,
        img: ["https://example.com/reine1.jpg", "https://example.com/reine2.jpg"],
        source: "Date a Live",
        user: null
    },
    {
        id: "2",
        name: "Kurumi Tokisaki",
        gender: "Mujer",
        value: 3000,
        img: ["https://example.com/kurumi1.jpg", "https://example.com/kurumi2.jpg"],
        source: "Date a Live",
        user: null
    },
    // Agrega más personajes aquí...
];
 {
        id: "1",
        name: "velmiel",
        gender: "Mujer",
        value: 1900,
        img: ["https://files.catbox.moe/id1byh.jpg", "https://files.catbox.moe/h7xby4.jpg"],
        source: "Date a Live",
        user: null
    },
const handler = async (m, { text, args, conn }) => {
    if (!args.length) {
        return await conn.reply(m.chat, '《✧》Debes citar un personaje válido para reclamar.', m);
    }

    const characterName = args.join(' ').trim();
    const character = characters.find(c => c.name.toLowerCase() === characterName.toLowerCase());

    if (!character) {
        return await conn.reply(m.chat, '《✧》Debes citar un personaje válido para reclamar.', m);
    }

    if (character.user) {
        return await conn.reply(m.chat, `✦ El personaje ya ha sido reclamado por @${character.user.split('@')[0]}.`, m, {
            mentions: [character.user]
        });
    }

    // Reclamar el personaje
    const userId = m.sender;
    character.user = userId;

    const randomImage = character.img[Math.floor(Math.random() * character.img.length)];
    const message = `✦ Has reclamado a *${character.name}* con éxito.`;

    await conn.sendFile(m.chat, randomImage, `${character.name}.jpg`, message, m);

    // Confirmar actualización
    console.log(`El personaje "${character.name}" ha sido reclamado por ${userId}.`);
};

handler.command = ['c','rw']
export default handler;
