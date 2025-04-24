let handler = async (m, { conn }) => {
    // Lista de videos para el comando "I am atomic"
    const atomicVideos = [
        "https://files.catbox.moe/p4ciwk.mp4", // Video 1
        "https://files.catbox.moe/uim4zt.mp4", // Video 2
        "https://files.catbox.moe/nummx7.mp4", // Video 3
        "https://files.catbox.moe/nummx7.mp4", // Video 4
        "https://files.catbox.moe/eggcfo.mp4", // Video 5
        "https://files.catbox.moe/eggcfo.mp4", // Video 6
        "https://files.catbox.moe/eggcfo.mp4"  // Video 7
    ];

    // Seleccionar un video aleatorio
    const randomVideo = atomicVideos[Math.floor(Math.random() * atomicVideos.length)];

    // Mensaje que acompaña el video
    const mensaje = "💥 *I AM ATOMIC!* 💥\n¡Mira este video épico!";

    try {
        // Intentar enviar el video
        await conn.sendFile(m.chat, randomVideo, "atomic.mp4", mensaje, m);
    } catch (error) {
        console.error("Error al enviar el video:", error.message); // Registrar el error
        await conn.reply(m.chat, "⚠️ Ocurrió un error al enviar el video. Inténtalo nuevamente más tarde.", m);
    }
};

handler.help = ['I am atomic']; // Ayuda para el comando
handler.tags = ['fun', 'anime']; // Categoría del comando
handler.command = ['I am atomic']; // Nombre del comando

export default handler;
