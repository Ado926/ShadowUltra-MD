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
    m.react('😊'); // Reacción al mensaje

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `😳 \`${name2}\` *se ha sonrojado por* \`${name || who}\`. ¡Qué lindo momento!`;
    } else {
        str = `😳 \`${name2}\` *se ha sonrojado.* ¡Parece que algo le ha emocionado!`.trim();
    }

    if (m.isGroup) {
        const videos = [
            'https://telegra.ph/file/a4f925aac453cad828ef2.mp4',
            'https://telegra.ph/file/f19318f1e8dad54303055.mp4',
            'https://telegra.ph/file/15605caa86eee4f924c87.mp4',
            'https://telegra.ph/file/d301ffcc158502e39afa7.mp4',
            'https://telegra.ph/file/c6105160ddd3ca84f887a.mp4',
            'https://telegra.ph/file/abd44f64e45c3f30442bd.mp4',
            'https://telegra.ph/file/9611e5c1d616209bc0315.mp4'
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { text: str }, { quoted: m });
    }
};

handler.help = ['blush/sonrojarse @tag'];
handler.tags = ['diversión'];
handler.command = ['blush', 'sonrojarse', 'ruborizar'];
handler.group = true;

export default handler;
