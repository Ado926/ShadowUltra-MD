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
    m.react('😋'); // Reacción al mensaje

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `😜 \`${name2}\` *le sacó la lengua a* \`${name || who}\`. ¡Qué divertido!`;
    } else {
        str = `😝 \`${name2}\` *saca la lengua*`.trim();
    }

    if (m.isGroup) {
        const videos = [
            'https://files.catbox.moe/qhcqag.mp4', 
            'https://files.catbox.moe/tnsdlr.mp4', 
            'https://files.catbox.moe/fox9sl.mp4',
            'https://files.catbox.moe/lh4c2n.mp4',
            'https://files.catbox.moe/y2zg7b.mp4',
            'https://qu.ax/rlvKj.mp4',
            'https://qu.ax/sYXfh.mp4'
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who]; 
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { text: str }, { quoted: m });
    }
};

handler.help = ['bleh/lengua @tag'];
handler.tags = ['diversión'];
handler.command = ['bleh', 'lengua', 'gesto'];
handler.group = true;

export default handler;
