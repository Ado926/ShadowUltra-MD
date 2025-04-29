const characters = [
    {
       recompensa:"shadow bot 👻",
        id: "1",
        name: "shadow",
        gender: "hombre",
        value: 1900,
        img: ["https://files.catbox.moe/k94woq.jpg", "https://files.catbox.moe/gd3lvm.mp4"],
        source: "Date a Live",
        user: null,
        status: "Libre"
    },
    {
        recompensa:"shadow bot👻",
        id: "2",
        name: "shadow",
        gender: "hombre",
        value: 3000,
        img: ["https://example.com/kurumi1.jpg", "https://example.com/kurumi2.jpg"],
        source: "Date a Live",
        user: null,
        status: "Libre"
    },
    // Agrega más personajes aquí...
];

const cooldowns = {};

let handler = async (m, { conn }) => {
    const userId = m.sender;
    const now = Date.now();

    if (cooldowns[userId] && now < cooldowns[userId]) {
        const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return await conn.reply(m.chat, `《✧》Debes esperar *${minutes} minutos y ${seconds} segundos* para usar *#c* de nuevo.`, m);
    }

    if (m.quoted && m.quoted.sender === conn.user.jid) {
        try {
            const characterIdMatch = m.quoted.text.match(/ID: \*(.+?)\*/);

            if (!characterIdMatch) {
                await conn.reply(m.chat, '《✧》No se pudo encontrar el ID del personaje en el mensaje citado.', m);
                return;
            }

            const characterId = characterIdMatch[1];
            const character = characters.find(c => c.id === characterId);

            if (!character) {
                await conn.reply(m.chat, '《✧》El mensaje citado no es un personaje válido.', m);
                return;
            }

            if (character.user) {
                await conn.reply(m.chat, `《✧》El personaje ya ha sido reclamado por @${character.user.split('@')[0]}, inténtalo a la próxima :v.`, m, { mentions: [character.user] });
                return;
            }

            // Cambiar el estado del personaje a "Reclamado"
            character.user = userId;
            character.status = "Reclamado";

            await conn.reply(m.chat, `《✧》Has reclamado a *${character.name}* con éxito.`, m);

            // Registrar cooldown para el usuario
            cooldowns[userId] = now + 30 * 60 * 1000;

        } catch (error) {
            await conn.reply(m.chat, `✘ Error al reclamar el personaje: ${error.message}`, m);
        }

    } else {
        await conn.reply(m.chat, '《✧》Debes citar un personaje válido para reclamar.', m);
    }
};

handler.help = ['claim'];
handler.tags = ['gacha'];
handler.command = ['c', 'claim'];
handler.group = true;
handler.register = true;

export default handler;
