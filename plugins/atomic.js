let handler = async (m, { conn }) => {
    // URL del video directo (verifica que esté disponible)
    const videoUrl = "https://files.catbox.moe/p4ciwk.mp4"; // Cambia si el link falla

    // Mensaje de respuesta con emoji
    const mensaje = "👻 *¡I AM ATOMIC!* 💥 Aquí tienes tu video épico:";

    try {
        console.log("Ejecutando el comando .iamatomic...");
        
        // Responder al usuario con el mensaje
        await conn.reply(m.chat, mensaje, m);

        // Enviar el video
        await conn.sendFile(m.chat, videoUrl, 'atomic.mp4', '🔥 Video enviado con éxito', m);
    } catch (error) {
        console.error("Error al enviar el video:", error.message);
        await conn.reply(m.chat, "⚠️ Ocurrió un error al enviar el video. Inténtalo nuevamente más tarde.", m);
    }
};

handler.help = ['iamatomic'];
handler.tags = ['fun', 'anime'];
handler.command = ['iamatomic']; // sin espacios

export default handler;
