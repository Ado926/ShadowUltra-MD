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
    m.react('👻'); // Reacción al mensaje

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `🥴 \`${name2}\` *le dio un mordisco a* \`${name || who}\`. ¡Eso debió doler!`;
    } else {
        str = `🥴 \`${name2}\` *se mordió a sí mismo*. ¡Ten cuidado!`.trim();
    }
    
    if (m.isGroup) {
        const videos = [
            'https://files.catbox.moe/nssx5g.mp4', 
            'https://files.catbox.moe/c23bw3.mp4', 
            'https://files.catbox.moe/nxr7vx.mp4',
            'https://files.catbox.moe/j5yobc.mp4',
            'https://files.catbox.moe/o31g5x.mp4',
            'https://files.catbox.moe/c43d18.mp4'
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];
        
        let mentions = [who]; 
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { text: str }, { quoted: m });
    }
}

handler.help = ['bite/morder @tag'];
handler.tags = ['diversión'];
handler.command = ['bite', 'morder', 'mordisco'];
handler.group = true;

export default handler;
