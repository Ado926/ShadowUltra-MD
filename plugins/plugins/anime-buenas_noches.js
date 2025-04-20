import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    m.react('🌙'); // Reacción al mensaje

    const messages = [
        "🌜 ¡Buenas noches! Que el descanso te renueve y los sueños te guíen a un mejor mañana.",
        "🌌 La noche es el lienzo donde los sueños toman forma. ¡Que tengas un descanso reparador!",
        "✨ Relájate y deja que la calma de la noche te envuelva. ¡Dulces sueños!",
        "🌠 Hoy puede haber sido un día difícil, pero el descanso traerá nuevas oportunidades mañana.",
        "🌙 ¡Buenas noches! Que las estrellas iluminen tu camino en tus sueños.",
        "💤 Cierra los ojos, respira profundo y deja que el mundo descanse contigo."
    ];

    let randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (m.isGroup) {
        const videos = [
            'https://files.catbox.moe/u0ezkl.mp4',
            'https://files.catbox.moe/e63yib.mp4',
            'https://files.catbox.moe/4jj0pq.mp4',
            'https://files.catbox.moe/q8lkyy.mp4',
            'https://files.catbox.moe/4tpkt3.mp4',
            'https://files.catbox.moe/0z5pav.mp4'
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: randomMessage }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { text: randomMessage }, { quoted: m });
    }
};

handler.help = ['buenasnoches/night'];
handler.tags = ['grupo'];
handler.command = ['buenasnoches', 'noche', 'night'];
handler.group = true;

export default handler;
