let handler = async (m, { conn }) => {
    // URL del video directo
    const videoUrl = "https://files.catbox.moe/tuvideo.mp4"; // Reemplaza con un enlace válido de tu video

    // Respuesta al usuario
    const mensaje = "👻 *¡I AM ATOMIC!* 💥";

    try {
        console.log("Comando detectado: Enviando respuesta y video..."); // Mensaje de depuración
        // Responder al usuario con un mensaje
        await conn.reply(m.chat, mensaje, m);
        // Enviar el video al usuario
        await conn.sendFile(m.chat, videoUrl, "atomic.mp4", "", m);
    } catch (error) {
        console.error("Error al enviar el video:", error.message); // Registrar el error
        // Enviar un mensaje de error al usuario
        await conn.reply(m.chat, "⚠️ Ocurrió un error al enviar el video. Inténtalo nuevamente más tarde.", m);
    }
};

handler.help = ['I am atomic']; // Ayuda para el comando
handler.tags = ['fun', 'anime']; // Categoría del comando
handler.command = ['I am atomic']; // Nombre del comando

export default handler;
