const handler = async (m, { conn, command, text }) => {
  if (!text) return conn.reply(m.chat, `*[ ℹ️ ] Menciona algún usuario.*`, m);

  const percentages = Math.floor(Math.random() * 501);
  const emojis = {
gay: '🏳️‍🌈', lesbiana: '🏳️‍🌈', pajero: '😏💦', pajera: '😏💦', puto: '🔥🥵', puta: '🔥🥵', manco: '🎮💀', manca: '🎮💀', rata: '🐁🧀', prostituto: '🫦💋', prostituta: '🫦💋', sinpoto: '😂', sintetas: '😿', chipi: '😹🫵🏻'
  };

  const descriptions = {
    gay: [
"💙 Parece que solo te gusta un poco la fiesta arcoíris.",
"🖤 ¡Eres más gay que un desfile del orgullo!",
"💜 ¡Nivel DIOS!* Ya ni necesitas salir del clóset, lo rompiste."
    ],
    lesbiana: [
"👻 Tal vez un par de maratones de series lésbicas ayuden.",
"💗 No necesitas confirmación, ya lo sabíamos.",
"❣️ ¡Tu amor por las chicas es más fuerte que un ship de anime!"
    ],
    pajero: [
"🧡 Relájate, el internet no se va a acabar.",
"💞 Bueno, al menos te ejercitas un brazo...",
"💕 ¡Tus manos ya deberían estar aseguradas como patrimonio nacional!"
    ],
    pajera: [
"🧡 Relájate, el internet no se va a acabar.",
"💞 Bueno, al menos te ejercitas un brazo...",
"💕 ¡Tus manos ya deberían estar aseguradas como patrimonio nacional!"
    ],
    puto: [
"😼 Tranqui, no todos nacen con el talento.",
"😺 Si sigues así, te harán monumento en Tinder.",
"😻 ¡Ya ni el Diablo puede competir contigo!"
    ],
    puta: [
"😼 Tranqui, no todos nacen con el talento.",
"😺 Si sigues así, te dejarán mas abierta que las puertas del cielo vv.",
"😻 ¡Más información a su privado, uff mi amor!"
    ],
    manco: [
"🎮 ¿Seguro que no juegas con los pies?",
"🥷 ¡Cuidado! Hasta los bots juegan mejor que tú.",
"💀 Récord mundial en fallar tiros... ¡Sin balas!"
    ],
    manca: [
"🎮 ¿Porque eres así? Puta Mala",
"🥷 Anda a la cocina mejor no servís pa jugar",
"💀 Récord mundial en fallar tiros... ¡Sin balas!"
    ],
    rata: [
"🐁 Te falta robar un poco más, sigue practicando.",
"😂 Roba peor que el Real Madrid el puto este",
"💖 ¡Eres más rata que Remy de Ratatouille!"
    ],
    prostituto: [
"🗣️ Tranquilo, el mercado siempre necesita talento nuevo.",
"✨ ¡Tus servicios tienen 5 estrellas en Google!",
"💖 Eres tan solicitado que ya tienes tarjeta VIP."
    ],
    prostituta: [
"🙈 Tranquila que te voy hacer un oral.",
"🥵 ¿Lo haces por gusto verdad?",
"💖 ¿Cuando hacemos un trío? bebé"
    ]
    sinpoto: [
"😹 Tabla de mierdx",
"👹 Jaja tabla",
"🙉 Tablaaaaaaa"
    ]
    sintetas: [
"😿 Pobrecita.",
"😮‍💨 Seguro le hacen Bullying",
"😱 ¿Sos hombre?"
    ]
    chipi: [
"🤡 Pobre gil de mrd todo feo & chipi.",
"😹 ¿Por eso no tienes novia verdad?",
"💀 Seguro le cortaron el Pinchx"
    ]
  };

  if (!descriptions[command]) return m.reply(`*[ ⚠️ ] Comando inválido.*`);

  const emoji = emojis[command] || '';
  let description;
  if (percentages < 150) description = descriptions[command][0];
  else if (percentages > 400) description = descriptions[command][2];
  else description = descriptions[command][1];

  const responses = [
    "El destino lo ha decidido.",
    "Los datos no mienten.",
    "¡Aquí tienes tu certificado oficial!"
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];

  const cal = `*\`🤍 CALCULADORA 🤍\`*

🌿 *Los cálculos han arrojado que* \`${text.toUpperCase()}\` es \`${percentages}%\` ${command} ${emoji}*

• *${description}*
> *${response}*`.trim();

  async function loading() {
    const hawemod = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%"
    ];

    let { key } = await conn.sendMessage(m.chat, { text: `*☕ ¡Calculando Porcentaje!*`, mentions: conn.parseMention(cal) });

    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: hawemod[i], edit: key });
    }

    await conn.sendMessage(m.chat, { text: cal, edit: key, mentions: conn.parseMention(cal) });
  }

  loading();
};

handler.tags = ['fun'];
handler.group = true;
handler.command = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituto', 'prostituta', 'sinpoto', 'sintetas', 'chipi'];

export default handler;