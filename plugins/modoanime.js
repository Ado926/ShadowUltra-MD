let isOtakuMode = false; // Variable para almacenar el estado del modo Otaku

let handler = async (m, { conn, command }) => {
    // Comando para alternar el modo Otaku
    if (command === 'modianime') {
        isOtakuMode = !isOtakuMode; // Alternar entre modo normal y modo Otaku

        const estado = isOtakuMode ? '🌸 ¡Modo Otaku Activado! 🌸' : '💼 Modo Normal Activado 💼';
        const mensaje = isOtakuMode 
            ? `¡Ohayo, nakama! 🌸 Ahora responderé con un estilo sugoi~ ¡Usa palabras clave para activar mi energía kawaii! ✨`
            : `He vuelto a mi modo normal... ¡pero siempre tendrás mi poder nakama! 🌌`;

        await conn.reply(m.chat, `${estado}\n\n${mensaje}`, m);
        return;
    }

    // Responder usando palabras clave si el modo Otaku está activado
    if (isOtakuMode) {
        const palabrasClave = [
            'hola eres otaku?',
            'quién',
            'eres',
            'que',
            'puedes',
            'hacer',
            'quieres ir al cuarto',
            'conmigo'
        ]; // Lista de palabras clave
        const textoMensaje = m.text.toLowerCase(); // Convertir mensaje a minúsculas para comparar

        // Verificar si el mensaje contiene alguna palabra clave
        if (palabrasClave.some((palabra) => textoMensaje.includes(palabra))) {
            const respuestasOtaku = [
                '¡Konnichiwa, nakama! 🌸 ¿Cómo puedo ayudarte en esta aventura épica desu~?',
                '¡Sugoi! Tu energía me inspira para ser el héroe de este shonen. 🔥✨',
                '¡Hajimemashite, senpai! ¿Qué necesitas en este universo kawaii? 🌟',
                '¡Baka baka! Parece que necesitas mi ayuda. Desu~ 😏',
                '¡El poder de los nakama siempre triunfa! ¿Qué puedo hacer por ti? 🌸',
                '¡Ohayo! Creo que esta aventura será increíble, ¡cuenta conmigo senpai! 🌟'
            ];
            const respuestaAleatoria = respuestasOtaku[Math.floor(Math.random() * respuestasOtaku.length)];
            await conn.reply(m.chat, respuestaAleatoria, m);
            return;
        }
    }
    
    // Respuesta normal si no hay palabras clave y el modo Otaku no está activado
    if (!isOtakuMode) {
        await conn.reply(m.chat, 'Estoy en modo normal, ¿qué puedo hacer por ti?', m);
    }
};

handler.help = ['modianime']; // Ayuda para el comando
handler.tags = ['fun', 'anime']; // Etiquetas del comando
handler.command = ['modianime']; // Comandos disponibles

export default handler;
