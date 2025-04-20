import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;

    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('🥱'); // Reacción al mensaje

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `😒 \`${name2}\` *está cansado/a de* \`${name || who}\`. ¡Parece que necesita algo de emoción!`;
    } else {
        str = `😒 \`${name2}\` *está aburrido/a.* ¿Alguien que lo entretenga? 😆`.trim();
    }

    if (m.isGroup) {
        const videos = [
            'https://files.catbox.moe/n4o7x4.mp4', 
            'https://files.catbox.moe/1ynb8f.mp4', 
            'https://files.catbox.moe/ll9wvo.mp4',
            'https://files.catbox.moe/lvawwk.mp4',
            'https://files.catbox.moe/vf40qf.mp4',
            'https://files.catbox.moe/zr4zqz.mp4',
            'https://files.catbox.moe/fqe3sj.mp4'
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { text: str }, { quoted: m });
    }
};

handler.help = ['bored/aburrido @tag'];
handler.tags = ['diversión'];
handler.command = ['bored', 'aburrido', 'cansado'];
handler.group = true;

export default handler;
