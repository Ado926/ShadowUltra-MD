let handler = async (m, { conn }) => {
    // Video directo para enviar
    const videoUrl = "https://files.catbox.moe/p4ciwk.mp4"; // Reemplaza con una URL válida de tu video

    // Respuesta al usuario
    const mensaje = "👻 *¡I AM ATOMIC!* 💥";

    try {
        // Responder al usuario con el mensaje y enviar el video
        await conn.reply(m.chat, mensaje, m);
        await conn.sendFile(m.chat, videoUrl, "atomic.mp4", "", m);
    } catch (error) {
        console.error("Error al enviar el video:", error.message);
        await conn.reply(m.chat, "⚠️ Ocurrió un error al enviar el video. Inténtalo nuevamente más tarde.", m);
    }
};

handler.help = ['I am atomic']; // Ayuda para el comando
handler.tags = ['fun', 'anime']; // Categoría del comando
handler.command = ['I am atomic']; // Nombre del comando

export default handler;
