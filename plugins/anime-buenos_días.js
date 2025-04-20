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
            'https://files.catbox.moe/p5ohdf.mp4', 
            'https://files.catbox.moe/b8attz.mp4', 
            'https://files.catbox.moe/s0317p.mp4',
            'https://files.catbox.moe/s0317p.mp4',
            'https://files.catbox.moe/esipij.mp4',
            'https://files.catbox.moe/088r37.mp4'
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
