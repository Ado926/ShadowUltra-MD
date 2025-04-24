let handler = async (m, { conn }) => {
    const mensajeUsuario = m.text.toLowerCase().trim();

    if (mensajeUsuario === "yo soy antomico") {
        const audioUrl = "https://files.catbox.moe/s2c6vi.mp3"; // Reemplázalo con un enlace válido
        const mensaje = "🔊 *¡Antomico ha hablado! Escucha su audio:*";

        try {
            await conn.sendFile(m.chat, audioUrl, "antomico.mp3", mensaje, m);
        } catch (error) {
            console.error("Error al enviar el audio:", error);
            await conn.reply(m.chat, "⚠️ Ocurrió un error al intentar enviar el audio.", m);
        }
    }
};

handler.customPrefix = /yo soy antomico/i;
handler.command = [];

export default handler;
