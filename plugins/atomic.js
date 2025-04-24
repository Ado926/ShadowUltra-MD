let handler = async (m, { conn }) => {
    // URL del video directo
    const videoUrl = "https://files.catbox.moe/tuvideo.mp4"; // Reemplaza con una URL válida de tu video

    // Respuesta al usuario
    const mensaje = "👻 *¡I AM ATOMIC!* 💥";

    try {
        console.log("Intentando enviar el video..."); // Depuración
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

handler.help = ['I am atomic'];
handler.tags = ['fun', 'anime'];
handler.command = ['I am atomic'];

export default handler;
