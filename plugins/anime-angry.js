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
    m.react('😠'); // Reacción al mensaje

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `😡 \`${name2}\` *está molesto/a con* \`${name || who}\`.`;
    } else {
        str = `😡 \`${name2}\` *está enojado/a.*`.trim();
    }
    
    if (m.isGroup) {
        const videos = [
            'https://files.catbox.moe/lyz9kp.mp4',
            'https://files.catbox.moe/lyz9kp.mp4',
            'https://files.catbox.moe/c7cshp.mp4',
            'https://files.catbox.moe/o2voee.mp4',
            'https://files.catbox.moe/o2voee.mp4',
            'https://files.catbox.moe/pqpuks.mp4'
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who]; 
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { text: str }, { quoted: m });
    }
}

handler.help = ['angry/enojado @tag'];
handler.tags = ['reacciones'];
handler.command = ['angry', 'enojado', 'molesto'];
handler.group = true;

export default handler;
