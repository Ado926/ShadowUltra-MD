let handler = async (m, { conn }) => {
    // URL del video directo (asegúrate de que sea válida)
    const videoUrl = "https://files.catbox.moe/ogjqzc.mp4"; // Reemplázala con tu enlace de video

    // Mensaje de respuesta con emoji
    const mensaje = `👻 *¡I AM ATOMIC!* 💥`;

    try {
        console.log("Ejecutando el comando .I am atomic..."); // Mensaje de depuración
        
        // Responder al usuario con el emoji 👻
        await conn.reply(m.chat, mensaje, m);

        // Enviar el video con parámetros correctos
        await conn.sendFile(m.chat, videoUrl, "atomic.mp4", null, m, false, { mimetype: "video/mp4" });
        
    } catch (error) {
        console.error("Error al enviar el video:", error.message);
        await conn.reply(m.chat, "⚠️ Ocurrió un error al enviar el video. Inténtalo nuevamente más tarde.", m);
    }
};

handler.help = ['I am atomic'];
handler.tags = ['fun', 'anime'];
handler.command = ['I am atomic'];

export default handler;
