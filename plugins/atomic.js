let handler = async (m, { conn }) => {
    // URL del video directo
    const videoUrl = "https://files.catbox.moe/p4ciwk.mp4"; // Reemplaza con un enlace válido de tu video

    // Mensaje de respuesta con emoji
    const mensaje = "👻 *¡I AM ATOMIC!* 💥 Aquí tienes tu video épico:";

    try {
        console.log("Ejecutando el comando .I am atomic..."); // Mensaje de depuración
        // Responder al usuario con el mensaje
        await conn.reply(m.chat, mensaje, m);
        // Enviar el video
        await conn.sendFile(m.chat, videoUrl, "atomic.mp4", "", m);
    } catch (error) {
        console.error("Error al enviar el video:", error.message);
        await conn.reply(m.chat, "⚠️ Ocurrió un error al enviar el video. Inténtalo nuevamente más tarde.", m);
    }
};

handler.help = ['I am atomic'];
handler.tags = ['fun', 'anime'];
handler.command = ['I am atomic'];

export default handler;
