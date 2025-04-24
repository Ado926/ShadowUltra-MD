import fs from 'fs';

const estadoFile = './src/database/estado_otaku.json'; // Archivo para almacenar el estado del modo Otaku

// Cargar estado del modo Otaku desde el archivo
let isOtakuMode = false;
if (fs.existsSync(estadoFile)) {
    const data = fs.readFileSync(estadoFile, 'utf-8');
    isOtakuMode = JSON.parse(data).isOtakuMode;
}

let handler = async (m, { conn }) => {
    // Verifica si el usuario activó el modo Otaku con `.modianime`
    if (m.text.toLowerCase() === '.modianime') {
        isOtakuMode = !isOtakuMode; // Alternar entre modo normal y modo Otaku
        
        // Guardar estado en el archivo
        fs.writeFileSync(estadoFile, JSON.stringify({ isOtakuMode }), 'utf-8');

        const estado = isOtakuMode ? '🌸 ¡Modo Otaku Activado! 🌸' : '💼 Modo Normal Activado 💼';
        const mensaje = isOtakuMode 
            ? `¡Ohayo, nakama! 🌸 Ahora responderé con un estilo sugoi~ ¡Usa palabras clave para activar mi energía kawaii! ✨`
            : `He vuelto a mi modo normal... ¡pero siempre tendrás mi poder nakama! 🌌`;

        await conn.reply(m.chat, `${estado}\n\n${mensaje}`, m);
        return;
    }

    // Si el modo Otaku está activado, el bot analizará TODOS los mensajes recibidos
    if (isOtakuMode) {
        const palabrasClave = [
            'hola eres otaku?', 'quién', 'eres', 'que', 'puedes', 
            'hacer', 'quieres ir al cuarto', 'conmigo'
        ];

        const textoMensaje = m.text.toLowerCase(); // Convertir mensaje a minúsculas para comparar

        // Verificar si el mensaje contiene alguna palabra clave
        if (palabrasClave.some((palabra) => textoMensaje.includes(palabra))) {
            const respuestasOtaku = [
                '¡Konnichiwa, nakama! 🌸 ¿Cómo puedo ayudarte en esta aventura épica desu~?',
                '¡Sugoi! Tu energía me inspira para ser el héroe de este shonen. 🔥✨',
                '¡Hajimemashite, senpai! ¿Qué necesitas en este universo kawaii? 🌟',
                '¡Baka baka! Parece que necesitas mi ayuda. Desu~ 😏',
                '¡El poder de los nakama siempre triunfa! ¿Qué puedo hacer por ti? 🌸',
                '¡Ohayo, senpai! Estoy listo para la siguiente misión, ¡cuenta conmigo! 🌟'
            ];
            const respuestaAleatoria = respuestasOtaku[Math.floor(Math.random() * respuestasOtaku.length)];
            await conn.reply(m.chat, respuestaAleatoria, m);
            return;
        }
    }
};

// Configuración para interceptar todos los mensajes
handler.customPrefix = /.*/; 
handler.command = []; // No depende de comandos específicos

export default handler;
