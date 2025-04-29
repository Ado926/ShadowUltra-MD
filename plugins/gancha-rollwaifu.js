const cooldowns = {}

// Base de datos de personajes directamente en el código
const characters = [
    {
        id: "1",
        name: "Reine Murasame",
        gender: "Mujer",
        value: 1900,
        img: ["https://files.catbox.moe/jhhy39.jpeg", "https://files.catbox.moe/cwzr7t.jpg"],
        source: "Date a Live",
        user: null
    },
    {
        id: "2",
        name: "Kurumi Tokisaki",
        gender: "Mujer",
        value: 3000,
        img: ["https://files.catbox.moe/yro161.jpg", "https://files.catbox.moe/mkh4bt.jpg"],
        source: "Date a Live",
        user: null
    },
    // Agrega más personajes aquí...
]
 {
        id: "1",
        name: " velmiel",
        gender: "Mujer",
        value: 19000,
        img: ["https://files.catbox.moe/id1byh.jpg", "https://files.catbox.moe/h7xby4.jpg"],
        source: "Date a Live",
        user: null
    },
// Harem simulado, almacenado internamente en el código
let harem = []

let handler = async (m, { conn }) => {
    const userId = m.sender
    const now = Date.now()

    if (cooldowns[userId] && now < cooldowns[userId]) {
        const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000)
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
        return await conn.reply(m.chat, `《✧》Debes esperar *${minutes} minutos y ${seconds} segundos* para usar *#rw* de nuevo.`, m)
    }

    try {
        // Seleccionar un personaje aleatorio
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
        const randomImage = randomCharacter.img[Math.floor(Math.random() * randomCharacter.img.length)]

        // Verificar si el personaje está en el harem
        const userEntry = harem.find(entry => entry.characterId === randomCharacter.id)
        const statusMessage = randomCharacter.user 
            ? `Reclamado por @${randomCharacter.user.split('@')[0]}` 
            : 'Libre'

        const message = `❀ Nombre » *${randomCharacter.name}*
⚥ Género » *${randomCharacter.gender}*
✰ Valor » *${randomCharacter.value}*
♡ Estado » ${statusMessage}
❖ Fuente » *${randomCharacter.source}*
✦ ID: *${randomCharacter.id}*`

        const mentions = userEntry ? [userEntry.userId] : []
        await conn.sendFile(m.chat, randomImage, `${randomCharacter.name}.jpg`, message, m, { mentions })

        // Actualizar el estado si el personaje está libre
        if (!randomCharacter.user) {
            randomCharacter.user = userId
            harem.push({ userId, characterId: randomCharacter.id })
        }

        // Actualizar el cooldown para el usuario
        cooldowns[userId] = now + 15 * 60 * 1000

    } catch (error) {
        await conn.reply(m.chat, `✘ Error al cargar el personaje: ${error.message}`, m)
    }
}

handler.help = ['ver', 'rw', 'rollwaifu']
handler.tags = ['gacha']
handler.command = ['ver', 'rw', 'rollwaifu']
handler.group = true

export default handler
