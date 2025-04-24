let handler = async (m, { conn }) => {
    // Base de datos de videos para el comando "I am atomic"
    const atomicVideos = [
        "https://files.catbox.moe/p4ciwk.mp4",
        "https://files.catbox.moe/uim4zt.mp4",
        "https://files.catbox.moe/nummx7.mp4",
        "https://files.catbox.moe/eggcfo.mp4",
        "https://files.catbox.moe/60k1ro.mp4",
        "https://files.catbox.moe/drbuju.mp4",
        "https://files.catbox.moe/yz988u.mp4"
    ];

    // Seleccionar un video aleatorio
    const randomVideo = atomicVideos[Math.floor(Math.random() * atomicVideos.length)];

    // Mensaje para acompañar el video
    const mensaje = "💥 *I AM ATOMIC!* 💥\nDisfruta este video épico:";

    // Enviar el video al usuario
    try {
        await conn.sendFile(m.chat, randomVideo, "atomic.mp4", mensaje, m);
    } catch (error) {
        console.error("Error al enviar el video:", error);
        await conn.reply(m.chat, "⚠️ Ocurrió un error al intentar enviar el video. Inténtalo de nuevo más tarde.", m);
    }
};

handler.help = ['I am atomic'];
handler.tags = ['fun', 'anime'];
handler.command = ['I am atomic']; // Comando disponible

export default handler;
