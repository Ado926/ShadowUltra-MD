let handler = async (m, { conn }) => {
    // Convertir el mensaje del usuario a minúsculas
    const mensajeUsuario = m.text.toLowerCase().trim();

    // Palabra clave que activará la respuesta
    if (mensajeUsuario === "yo soy antomico") {
        // URL del audio que se enviará
        const audioUrl = "https://files.catbox.moe/7qt88t.m4a"; // Reemplázalo con tu archivo de audio

        // Mensaje que acompaña el audio
        const mensaje = "🔊 *¡Antomico ha hablado! Escucha su audio:*";

        // Enviar el audio al usuario
        await conn.sendFile(m.chat, audioUrl, "antomico.mp3", mensaje, m);
    }
};

handler.customPrefix = /yo soy antomico/i; // Detecta la frase en el chat
handler.command = []; // No es un comando, sino una respuesta automática

export default handler;
