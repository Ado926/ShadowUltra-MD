let handler = async (m, { conn }) => {
    // URL del audio que se enviará
    const audioUrl = "https://files.catbox.moe/mjpong.mp4"; // Reemplaza con tu enlace de audio válido

    // Mensaje que acompaña el audio
    const mensaje = "🔊 *¡I am atomic! Escucha el audio épico:*";

    // Enviar el audio al usuario
    try {
        await conn.sendFile(m.chat, audioUrl, "atomic.mp3", mensaje, m);
    } catch (error) {
        console.error("Error al enviar el audio:", error);
        await conn.reply(m.chat, "⚠️ Ocurrió un error al intentar enviar el audio. Por favor, intenta de nuevo más tarde.", m);
    }
};

handler.help = ['I am atomic'];
handler.tags = ['fun', 'audio'];
handler.command = ['I am atomic']; // Comando disponible

export default handler;
