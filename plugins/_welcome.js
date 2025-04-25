importar fetch desde 'node-fetch';

exportar función asíncrona antes de (m, { conexión, participantes, grupoMetadata }) {
  si (!m.messageStubType || !m.isGroup) devuelve verdadero;

  sea vn = 'https://files.catbox.moe/g5h8ip.m4a';
  sea vn2 = 'https://files.catbox.moe/q9ti4u.m4a';
  dejar chat = global.db.data.chats[m.chat];
  constante getMentionedJid = () => {
    devolver m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  dejar quien = m.messageStubParameters[0] + '@s.whatsapp.net';
  deje que el usuario = global.db.data.users[quien];
  deje que userName = usuario ? usuario.nombre : await conn.getName(quien);

  const miniatura = await (await fetch('https://files.catbox.moe/elx34q.jpg')).buffer();
  const redes = 'https://chat.whatsapp.com/tu-grupo'; // Ajusta si quieres un enlace real

  si (chat.bienvenida && m.messageStubType === 27) {
    este.enviarMensaje(m.chat, {
      audio: { url: vn },
      Información de contexto: {
        Información del mensaje del boletín reenviado: {
          Boletín informativoJid: "120363402846939411@boletín informativo",
          ID del mensaje del servidor: '',
          newsletterNombre: 'puros panas papus 👻'
        },
        Puntuación de reenvío: 9999999,
        isForwarded: verdadero,
        mencionadoJid: obtenerMencionadoJid(),
        Respuesta de anuncio externo: {
          título: `✨ Bienvenido/a ${userName} ✨`,
          body: `¡Nos alegra tenerte aquí en *${groupMetadata.subject}*!`,
          vista previaTipo: "FOTO",
          uña del pulgar,
          URL de origen: redes,
          showAdAttribution: verdadero
        }
      },
