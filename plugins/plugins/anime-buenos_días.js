import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    m.react('🌟'); // Reacción al mensaje

    const messages = [
        "¡Hola! 🌟 Que este momento esté lleno de felicidad y energía positiva.",
        "¡Qué gusto verte! 🌈 Recuerda que cada día es una nueva oportunidad.",
        "¡Espero que estés disfrutando! 🦋 La vida está llena de pequeñas maravillas.",
        "¡Hola! 🌼 Hoy puede ser el comienzo de algo increíble.",
        "¡Saludos! 🌺 Recuerda que eres más fuerte de lo que piensas.",
        "¡Hola! 🌞 Siempre hay un motivo para sonreír, ¡encuéntralo!"
    ];

    let randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (m.isGroup) {
        let images = [
            'https://files.catbox.moe/6zr7md.jpg', 
            'https://files.catbox.moe/oi142u.jpg', 
            'https://files.catbox.moe/ss3hve.jpg',
            'https://files.catbox.moe/9wbsvg.jpg',
            'https://files.catbox.moe/c8dyrr.jpg',
            'https://files.catbox.moe/slgyh7.jpg'
        ];

        const image = images[Math.floor(Math.random() * images.length)];

        conn.sendMessage(m.chat, { image: { url: image }, caption: randomMessage }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { text: randomMessage }, { quoted: m });
    }
};

handler.help = ['saludo/greeting'];
handler.tags = ['grupo'];
handler.command = ['saludo', 'greet', 'hi'];
handler.group = true;

export default handler;
