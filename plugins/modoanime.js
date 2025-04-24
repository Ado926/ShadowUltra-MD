let isOtakuMode = false; // Variable para almacenar el estado del modo anime

let handler = async (m, { conn }) => {
    // Activar/desactivar el modo anime con `.modoanime`
    if (m.text.toLowerCase() === '.modoanime') {
        isOtakuMode = !isOtakuMode; // Alternar entre modo normal y modo anime

        const estado = isOtakuMode ? '🌸 ¡Modo Anime Activado! 🌸' : '💼 Modo Normal Activado 💼';
        const mensaje = isOtakuMode 
            ? `¡Ohayo, nakama! 🌸 Ahora hablaré como un verdadero personaje de anime~ ¡Usa palabras clave para activar mis respuestas kawaii! ✨`
            : `He vuelto a mi modo normal... ¡pero seguiré siendo tu nakama! 🌌`;

        await conn.reply(m.chat, `${estado}\n\n${mensaje}`, m);
        return;
    }

    // Si el modo anime está activado, responder a las palabras clave automáticamente
    if (isOtakuMode) {
        const palabrasClave = ['hola', 'cómo estás?', 'eres Otaku', 'podemos ir a cuarto 👉👈']; // Lista de palabras clave
        const textoMensaje = m.text.toLowerCase(); // Convertir mensaje a minúsculas para comparar

        // Verificar si el mensaje contiene alguna palabra clave
        if (palabrasClave.some((palabra) => textoMensaje.includes(palabra))) {
            const respuestasAnime = [
                '¡Konnichiwa, nakama! 🌸 Soy un auténtico Otaku, listo para una gran aventura desu~',
                '¡Sugoi! Tu energía me inspira, ¿qué misión épica tienes en mente? 🔥✨',
                '¡Hajimemashite, senpai! ¿Cómo puedo hacer este día más kawaii para ti? 🌟',
                '¡Baka baka! Parece que necesitas mi ayuda. ¡Cuenta conmigo, nakama! 😏',
                '¡Ohayo, nakama! Estoy listo para divertirnos, ¿qué quieres hacer hoy? 👉👈'
            ];
            const respuestaAleatoria = respuestasAnime[Math.floor(Math.random() * respuestasAnime.length)];
            await conn.reply(m.chat, respuestaAleatoria, m);
            return;
        }
    }
};

// Configuración para interceptar todos los mensajes
handler.customPrefix = /.*/; 
handler.command = []; // No depende de comandos específicos

export default handler;
