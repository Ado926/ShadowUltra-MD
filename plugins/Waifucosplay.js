import axios from 'axios';

const handler = async (m, { conn }) => {
    try {
        await m.react("✨");

        // Obtener una imagen aleatoria de waifus cosplay desde Waifu Pics
        const response = await axios.get("https://api.waifu.pics/sfw/cosplay");

        // Verificar que la API respondió correctamente
        if (!response.data || !response.data.url) {
            throw new Error("❌ No se pudo obtener una imagen de la API.");
        }

        const imageUrl = response.data.url;

        // Enviar la imagen con mensaje
        await conn.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: "🌸 *Aquí tienes una waifu en cosplay* 🌸\n🔹 ¿Te gusta este personaje? 😍",
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: "Waifu Cosplay",
                    body: "Imágenes de chicas en cosplay de anime",
                    mediaType: 1,
                    sourceUrl: imageUrl,
                    thumbnail: imageUrl
                }
            }
        });

    } catch (error) {
        console.error("Error al obtener imágenes:", error);
        await conn.reply(m.chat, "❌ No se pudo obtener una imagen en este momento. Intenta de nuevo más tarde.", m);
    }
}

handler.help = ["waifucosplay"];
handler.tags = ["anime"];
handler.command = ["waifucosplay", "cosplay"];

export default handler;
