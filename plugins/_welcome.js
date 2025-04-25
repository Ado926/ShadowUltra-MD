import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://files.catbox.moe/g5h8ip.m4a';
  let vn2 = 'https://files.catbox.moe/q9ti4u.m4a';
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];
  let userName = user ? user.name : await conn.getName(who);

  const thumbnail = await (await fetch('https://files.catbox.moe/uak1qu.jpg')).buffer();
  const redes = 'https://chat.whatsapp.com/tu-grupo'; // Ajustá si querés un link real

  if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, {
      audio: { url: vn },
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363402846939411@newsletter",
          serverMessageId: '',
          newsletterName: 'shadow'
        },
        forwardingScore: 9999999,
        isForwarded: true,
        mentionedJid: getMentionedJid(),
        externalAdReply: {
          title: `✨ Bienvenido/a ${userName} ✨`,
          body: `¡Nos alegra tenerte aquí en *${groupMetadata.subject}*!`,
          previewType: "PHOTO",
          thumbnail,
          sourceUrl: redes,
          showAdAttribution: true
        }
      },
      seconds: '2000',
      ptt: true,
      mimetype: 'audio/mpeg',
      fileName: `bienvenida.mp3`
    }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
  }

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, {
      audio: { url: vn2 },
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363417092486861@newsletter",
          serverMessageId: '',
          newsletterName: 'Vivos Vivientes 🌸'
        },
        forwardingScore: 9999999,
        isForwarded: true,
        mentionedJid: getMentionedJid(),
        externalAdReply: {
          title: `❀ Adiós ${userName} ❀`,
          body: `Esperamos verte de nuevo por *${groupMetadata.subject}*`,
          previewType: "PHOTO",
          thumbnail,
          sourceUrl: redes,
          showAdAttribution: true
        }
      },
      seconds: '2000',
      ptt: true,
      mimetype: 'audio/mpeg',
      fileName: `despedida.mp3`
    }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
  }
          }
