export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};

  // Lista de palabras clave a detectar
  const palabrasClave = ['PIEDRA', 'PAPEL', 'TIJERA', 'serbot', 'jadibot'];
  
  if (palabrasClave.some((palabra) => m.text.includes(palabra))) return true;
  if (m.chat === '120363416409380841@newsletter') return true;

  // Bloqueo de chats privados si la opción está activada
  if (bot.antiPrivate && !isOwner && !isROwner) {
    const grupoURL = 'https://chat.whatsapp.com/BjxHLM1Ca8P4JPJ0gHl1tD'; // Define el enlace del grupo
    const mensajeBloqueo = `⚠️ *Hola @${m.sender.split`@`[0]}*, mi creador ha desactivado los comandos en chats privados.\n\n🔗 *Únete al grupo oficial para usar el bot:* ${grupoURL}`;
    const imagenURL = 'https://files.catbox.moe/l2ok2m.jpg'; // URL de la imagen

    // Enviar la imagen junto con el mensaje de bloqueo
    await conn.sendFile(m.chat, imagenURL, 'antiprivado.jpg', mensajeBloqueo, m, false, { mentions: [m.sender] });
    await conn.updateBlockStatus(m.chat, 'block');
  }

  return false;
}
