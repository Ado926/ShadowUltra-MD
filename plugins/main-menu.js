import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange} from '../lib/levelling.js'
import { promises} from 'fs'
import { join} from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command}) => {
    try {
        let { exp, diamantes, level, role} = global.db.data.users[m.sender]
        let { min, xp, max} = xpRange(level, global.multiplier)
        let name = await conn.getName(m.sender)
        exp = exp || 'Desconocida';
        role = role || 'Aldeano';

        const _uptime = process.uptime() * 1000;
        const uptime = clockString(_uptime);

        let totalreg = Object.keys(global.db.data.users).length
        let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length

        await m.react('💥')

        let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]: m.fromMe? conn.user.jid: m.sender
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/pk3xxk.jpg')

        const videoAviso = 'https://files.catbox.moe/mjiw8f.mp4' // URL del video de aviso
        const videoMenu = 'https://files.catbox.moe/eggcfo.mp4' // URL fija del video del menú

        // 📢 Enviar video con mensaje previo
        await conn.sendMessage(m.chat, {
            video: { url: videoAviso},
            caption: "✨ **¡Enviando tu menú!** ✨"
});

        // ⏳ Pausa breve para mayor realismo
        await new Promise(resolve => setTimeout(resolve, 2000));

        let menu = `
 🌑『🖤 𝐒𝐇𝐀𝐃𝐎𝐖 𝐆𝐀𝐑𝐃𝐄𝐍 🖤』🌑

೯ ׅ 🕵️‍♂️ ¡Hᴏʟᴀ! ¿Cᴏᴍᴏ Esᴛᴀ́s? ׄ ᦡᦡ
ㅤ꒰͜͡${taguser}
ㅤㅤ♡𑂳ᩙㅤ ּ ${saludo} ׄ ㅤタス
✨ *La eminencia en la sombra ha revelado sus secretos...* ✨
🔮 *Usuario:* ${name}
🏅 *Rango:* ${role}
💎 *Gemas:* ${diamantes}
🎖 *Nivel:* ${level}
🔥 *Exp:* ${exp}
⏳ *Activo por:* ${uptime}
👥 *Miembros en la oscuridad:* ${totalreg}
❖『𝘾𝙤𝙢𝙖𝙣𝙙𝙤𝙨 𝙙𝙚 𝙡𝙖 𝙎𝙝𝙖𝙙𝙤𝙬 𝙂𝙖𝙧𝙙𝙚𝙣』❖
𓂂𓏸  𐅹੭੭   *\`𝐌𝐄𝐍𝐔 𝐃𝐄 𝐋𝐀 𝐄𝐌𝐈𝐍𝐄𝐍𝐂𝐈𝐀\`* 🌑🖤
  ׄ 🔮 ${usedPrefix}shadowmenu - Revela los secretos de la oscuridad
ര ׄ 👁️ ${usedPrefix}menuaudios - Susurros desde las sombras
ര ׄ ⚔️ ${usedPrefix}menuff - Herramientas de los discípulos de la eminencia
ര ׄ 👑 ${usedPrefix}menuowner - Control absoluto desde la oscuridad
ര ׄ 🕶️ ${usedPrefix}menulogos - Emblemas de la Shadow Garden
ര ׄ 🎭 ${usedPrefix}menuanimes - Ecos de la sombra
𓂂𓏸  𐅹੭੭   *\`𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄 𝐋𝐀 𝐄𝐌𝐈𝐍𝐄𝐍𝐂𝐈𝐀\`* 🌑🖤
ര ׄ 👁‍🗨˚ ${usedPrefix}totalf - Número de discípulos en la oscuridad
ര ׄ 🔮˚ ${usedPrefix}grupos - Reinos bajo el mando de la sombra
ര ׄ 💭˚ ${usedPrefix}sugerir - Susurrando planes en la penumbra
ര ׄ 👻˚ ${usedPrefix}report - Informes desde la dimensión oculta
ര ׄ 🕶️˚ ${usedPrefix}owner - La presencia del líder supremo
ര ׄ ⚡˚ ${usedPrefix}ping - El pulso de la eminencia en la sombra
ര ׄ ⏳˚ ${usedPrefix}uptime - Tiempo de actividad en la oscuridad
ര ׄ 🌙˚ ${usedPrefix}horario - Rituales en los tiempos sombríos
ര ׄ 💎˚ ${usedPrefix}precios - Poderes intercambiables dentro de la sombra
𓂂𓏸  𐅹੭੭   *\`𝐀𝐂𝐓𝐈𝐕𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄 𝐋𝐀 𝐎𝐒𝐂𝐔𝐑𝐈𝐃𝐀𝐃\`* 🌑🖤
ര ׄ 👁‍🗨˚ ${usedPrefix}enable *invocar el poder oculto*
ര ׄ 🔮˚ ${usedPrefix}disable *sellar las fuerzas de la sombra*
ര ׄ ⚔️˚ ${usedPrefix}on *desatar la eminencia en la oscuridad*
ര ׄ 🕶️˚ ${usedPrefix}off *ocultar la presencia en el abismo*
ര ׄ 📜˚ ${usedPrefix}manual *dominar los secretos de la Shadow Garden*
𓂂𓏸  𐅹੭੭   *\`𝐀𝐋𝐌𝐀𝐂𝐄́𝐍 𝐃𝐄 𝐋𝐀 𝐄𝐌𝐈𝐍𝐄𝐍𝐂𝐈𝐀\`* 🌑🖤
⚔️ *Los conocimientos ocultos aguardan en la oscuridad...*
👁‍🗨 *Invocación de datos desde las sombras:*
🕶️ ${usedPrefix}playaudio *Extrae sonidos del abismo*
🔮 ${usedPrefix}aplay *Desata el eco de la sombra*
📽️ ${usedPrefix}aplayvideo *Revela visiones del dominio oscuro*
🌀 ${usedPrefix}splay *Remanentes de la eminencia*
⚔️ *Descargas desde los dominios secretos:*
💀 ${usedPrefix}ytmp4doc *Captura la esencia de la oscuridad en video*
🌘 ${usedPrefix}ytmp3doc *Extrae los susurros de la sombra en audio*
📜 ${usedPrefix}apk *Accede a herramientas ocultas*
🔍 ${usedPrefix}pinterest *Visiones del inframundo*
🔥 ${usedPrefix}capcut *Forja la estética de la eminencia*
✨ ${usedPrefix}pinvid *Testimonios de la sombra*
🕶️ *Invocaciones de las redes ocultas:*
👻 ${usedPrefix}ytmp4 *Recoge fragmentos de la oscuridad*
⚡ ${usedPrefix}ytmp3 *Accede a las voces enigmáticas*
👑 ${usedPrefix}tiktok *Mensajes desde los discípulos de la sombra*
🌑 ${usedPrefix}instagram *Imágenes del imperio oscuro*
🦴 ${usedPrefix}facebook *Reliquias del pasado*
📂 ${usedPrefix}mediafire *Archivos sellados en la penumbra*
🔗 ${usedPrefix}mega *Tesoros en la profundidad del abismo*
🌀 ${usedPrefix}playstore *Tecnologías de la Shadow Garden*
𓂂𓏸  𐅹੭੭   *\`𝐈𝐍𝐕𝐄𝐒𝐓𝐈𝐆𝐀𝐂𝐈𝐎́𝐍 𝐄𝐍 𝐋𝐀 𝐎𝐒𝐂𝐔𝐑𝐈𝐃𝐀𝐃\`* 🌑🖤
⚔️ *Desentraña los secretos sellados en las sombras...*
👁‍🗨 *Exploración del conocimiento oculto:*
🔮 ${usedPrefix}scsearch *Los registros secretos de la eminencia*
🕶️ ${usedPrefix}aplaysearch *Susurros de la sombra convertidos en eco*
📡 ${usedPrefix}ttsearch *Localiza los informes de la penumbra*
📜 ${usedPrefix}ytsearch *Accede a la crónica del destino oscuro*
🎶 ${usedPrefix}spotifysearch *Notas encantadas desde la Shadow Garden*
👑 ${usedPrefix}githubsearch *Fragmentos del código prohibido*
🛡️ ${usedPrefix}playstoresearch *Herramientas del reino oscuro*
⚡ ${usedPrefix}gnula *Registros de leyendas selladas*
📂 ${usedPrefix}mercadolibre *Reliquias de la penumbra eterna*
🕵️ ${usedPrefix}ffstalk *Rastreo de los movimientos ocultos*
🌘 ${usedPrefix}animeplus *Archivos de guerreros en la sombra*
𓂂𓏸  𐅹੭੭   *\`𝐋𝐀 𝐂𝐎𝐍𝐂𝐈𝐄𝐍𝐂𝐈𝐀 𝐃𝐄 𝐋𝐀 𝐒𝐎𝐌𝐁𝐑𝐀\`* 🤖💀
👁‍🗨 *Activación de la inteligencia oscura:*
🧠 ${usedPrefix}ia *Consulta el oráculo de la eminencia*
🌑 ${usedPrefix}shadow *Invoca el conocimiento de la penumbra*
🔮 ${usedPrefix}flux *Desata la percepción suprema de la sombra*
🌀 ${usedPrefix}chatgpt *Los escritos antiguos de los discípulos secretos*
📸 ${usedPrefix}imgg *Visiones ocultas desde la Shadow Garden*
⚔️ ${usedPrefix}simi *Intercambio de sabiduría con los seguidores de la sombra*
𓂂𓏸  𐅹੭੭   *\`𝐋𝐀 𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐋𝐀 𝐒𝐎𝐌𝐁𝐑𝐀\`* 🌑🖤
⚔️ *Registros de los discípulos de la eminencia...*
👁‍🗨 *Clasificación de la oscuridad:*
🔮 ${usedPrefix}infem4 *Guerreras del abismo*
🕶️ ${usedPrefix}inmasc4 *Discípulos en entrenamiento*
📡 ${usedPrefix}inmixto4 *Fuerza equilibrada en la sombra*
📜 ${usedPrefix}infem6 *Veteranas del dominio oscuro*
🎭 ${usedPrefix}inmasc6 *Guardianes de la sombra eterna*
🔥 ${usedPrefix}inmixto6 *Ejército de la eminencia*
⚔️ ${usedPrefix}v4fem *Legiones preparadas para la sombra*
⚔️ ${usedPrefix}v4masc *Rangos ocultos del abismo*
🌘 ${usedPrefix}v4mixto *Equilibrio en la penumbra*
👑 ${usedPrefix}v6fem *Guías de la oscuridad infinita*
💀 ${usedPrefix}v6masc *Maestros del sendero sombrío*
🕶️ ${usedPrefix}v6mixto *Los elegidos por la eminencia*
𓂂𓏸  𐅹੭੭   *\`𝐄𝐂𝐎𝐒 𝐃𝐄 𝐋𝐀 𝐄𝐌𝐈𝐍𝐄𝐍𝐂𝐈𝐀\`* 🌹👁‍🗨
👑 ${usedPrefix}piropo *Mensajes ocultos en la penumbra*
🛡️ ${usedPrefix}consejo *Susurros de la sabiduría oscura*
🔮 ${usedPrefix}fraseromantica *Las palabras de la sombra eterna*
𓂂𓏸  𐅹੭੭   *\`𝐂𝐎𝐍𝐕𝐄𝐑𝐒𝐈𝐎𝐍 𝐀 𝐋𝐀 𝐏𝐄𝐍𝐔𝐌𝐁𝐑𝐀\`* 🔄🕶️
📜 ${usedPrefix}tourl *Invoca la transformación en la sombra*
🕶️ ${usedPrefix}toptt *Desata la voz de la oscuridad*
⚡ ${usedPrefix}tomp3 *Extrae la esencia enigmática*
👑 ${usedPrefix}toimg *Revela el artefacto oculto*
𓂂𓏸  𐅹੭੭   *\`𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒 𝐃𝐄 𝐋𝐀 𝐒𝐎𝐌𝐁𝐑𝐀\`* 🔧💀
🕶️ ${usedPrefix}clima *Observa los signos del destino oscuro*
📜 ${usedPrefix}readmore *Oculta fragmentos de la realidad*
👑 ${usedPrefix}fake *Manipula el mensaje desde la sombra*
🔮 ${usedPrefix}traducir *Convierte palabras en sigilos secretos*
🎭 ${usedPrefix}hd *Mejora las visiones de la oscuridad*
🕶️ ${usedPrefix}whatmusic *Descubre las melodías ocultas*
📂 ${usedPrefix}inspect *Analiza los dominios sellados*
⚡ ${usedPrefix}nuevonombrecanal *Renacimiento en la sombra*
🌀 ${usedPrefix}nuevadescchannel *Reescribe el destino del abismo*
𓂂𓏸  𐅹੭੭   *\`𝐂𝐀𝐌𝐀𝐑𝐀𝐒 𝐃𝐄 𝐋𝐀 𝐒𝐇𝐀𝐃𝐎𝐖 𝐆𝐀𝐑𝐃𝐄𝐍\`* 😼🔥
🛡️ ${usedPrefix}add *Seleccionar nuevos discípulos*
⚔️ ${usedPrefix}grupo abrir/cerrar *Control total sobre la oscuridad*
👁‍🗨 ${usedPrefix}grouptime *Tiempo asignado en la sombra*
🔮 ${usedPrefix}notify *Ecos del líder supremo*
💀 ${usedPrefix}admins *Órdenes de la eminencia*
📜 ${usedPrefix}todos *Convocación total en la penumbra*
🎭 ${usedPrefix}setwelcome *Susurros desde el abismo para nuevos discípulos*
🕶️ ${usedPrefix}groupdesc *Registros de los objetivos ocultos*
🌀 ${usedPrefix}setbye *Despedida en la penumbra*
🔥 ${usedPrefix}promote *@tag* *Ascensión dentro de la sombra*
💀 ${usedPrefix}demote *@tag* *Descenso en el reino oscuro*
👑 ${usedPrefix}kick *@tag* *Eliminación desde la eminencia*
🎭 ${usedPrefix}mute *@tag* *Silencio absoluto en la penumbra*
⚔️ ${usedPrefix}inactivos *Expulsión de los débiles*
🕶️ ${usedPrefix}tagnum *Marcando a los discípulos*
🔗 ${usedPrefix}link *Pasaje a los dominios oscuros*
👁‍🗨 ${usedPrefix}fantasmas *Rastreo de almas errantes*
𓂂𓏸  𐅹੭੭   *\`𝐄𝐅𝐄𝐂𝐓𝐎𝐒 𝐃𝐄 𝐋𝐀 𝐎𝐒𝐂𝐔𝐑𝐈𝐃𝐀𝐃\`* 👻🖤
⚔️ *Moldea la realidad con los susurros de la sombra...*
👁‍🗨 *Manipulación del sonido y la esencia:*
🔮 ${usedPrefix}bass *Resuena desde la profundidad del abismo*
🕶️ ${usedPrefix}blown *Desgarra el velo de la penumbra*
📡 ${usedPrefix}deep *Convoca la voz de la eminencia*
📜 ${usedPrefix}earrape *Amplifica el estruendo de la sombra*
🎭 ${usedPrefix}fast *Desata la velocidad de la oscuridad*
🔥 ${usedPrefix}smooth *Afina la esencia de la sombra eterna*
⚡ ${usedPrefix}nightcore *Encanta la melodía de la eminencia*
🌀 ${usedPrefix}reverse *Invierte el flujo del destino*
💀 ${usedPrefix}robot *Fusiona lo humano con la oscuridad*
👑 ${usedPrefix}slow *Detiene el tiempo en el abismo*
🌑 ${usedPrefix}squirrel *Retuerce las voces de la penumbra*
🎶 ${usedPrefix}chipmunk *Fragmenta el sonido oculto*
🔱 ${usedPrefix}reverb *Amplifica el eco de la oscuridad*
💀 ${usedPrefix}chorus *Invoca el canto de las sombras*
🕶️ ${usedPrefix}flanger *Distorsiona la realidad*
👁‍🗨 ${usedPrefix}distortion *Rompe los límites del sonido*
⚔️ ${usedPrefix}pitch *Transforma la intensidad de la eminencia*
🌘 ${usedPrefix}highpass *Filtra los susurros de la penumbra*
🛡️ ${usedPrefix}lowpass *Condensa el poder de la sombra*
🔮 ${usedPrefix}underwater *Sumérgete en el dominio oculto*
🔥 ${usedPrefix}iamatomic *Explosión de la esencia oscura*
𓂂𓏸  𐅹੭੭   *\`𝐃𝐈𝐕𝐄𝐑𝐒𝐈𝐎́𝐍 𝐃𝐄 𝐋𝐀 𝐄𝐌𝐈𝐍𝐄𝐍𝐂𝐈𝐀\`* 🎭🔥
👁‍🗨 *Interacción con los discípulos de la sombra:*
🔮 ${usedPrefix}simi *Responde con la sabiduría de la oscuridad*
🕶️ ${usedPrefix}pregunta *Formulación desde la penumbra*
📡 ${usedPrefix}genio *Consulta el conocimiento oculto*
📜 ${usedPrefix}top *Clasificación dentro del dominio de la eminencia*
💀 ${usedPrefix}sorteo *El destino en manos de la sombra*
🎭 ${usedPrefix}piropo *Palabras encantadas desde la oscuridad*
🌑 ${usedPrefix}chiste *Relatos sellados de la Shadow Garden*
👑 ${usedPrefix}facto *Verdades ocultas en el abismo*
🛡️ ${usedPrefix}pareja *Unión sellada por la sombra eterna*
⚔️ ${usedPrefix}love *Conexiones forjadas en la penumbra*
🌘 ${usedPrefix}personalidad *Rasgos formados en la eminencia*
𓂂𓏸  𐅹੭੭   *\`𝐏𝐑𝐔𝐄𝐁𝐀𝐒 𝐃𝐄 𝐋𝐀 𝐄𝐌𝐈𝐍𝐄𝐍𝐂𝐈𝐀\`* 🏆🕶️
👁‍🗨 *Desafíos entre los discípulos de la sombra:*
🔮 ${usedPrefix}pregunta *Prueba de conocimiento de la penumbra*
🕶️ ${usedPrefix}ttt *Duelo en las profundidades*
📡 ${usedPrefix}ptt *Decisión sobre el camino oscuro*
📜 ${usedPrefix}delttt *Eliminar rastros de la eminencia*
🎭 ${usedPrefix}acertijo *Desafío de la sabiduría oculta*
💀 ${usedPrefix}trivia *Prueba de la mente iluminada por la sombra*
𓂂𓏸  𐅹੭੭   *\`𝐀𝐍𝐈𝐌𝐄 𝐃𝐄 𝐋𝐀 𝐒𝐎𝐌𝐁𝐑𝐀\`* 🌑🖤
⚔️ *Invoca los gestos y expresiones dignos de la eminencia...*
👁‍🗨 *Manifestaciones del dominio oscuro:*
🔮 ${usedPrefix}saludo *Recibe la bendición de la sombra*
🕶️ ${usedPrefix}buenasnoches *Susurros desde el abismo antes del descanso*
📡 ${usedPrefix}bath *Purificación en las aguas de la penumbra*
📜 ${usedPrefix}bite *Marca del pacto en la oscuridad*
🎭 ${usedPrefix}bleh *Expresión de indiferencia entre discípulos*
🔥 ${usedPrefix}blush *Rubor de aquellos que han visto la eminencia*
🌘 ${usedPrefix}cry *Lamentos desde la dimensión oculta*
💀 ${usedPrefix}cuddle *Protección en los brazos de la sombra eterna*
🕶️ ${usedPrefix}dance *Rituales sagrados del dominio oscuro*
⚡ ${usedPrefix}drunk *Embriaguez por el poder de la oscuridad*
🌀 ${usedPrefix}eat *Festín de la Shadow Garden*
🌑 ${usedPrefix}facepalm *Incomprensión ante los secretos ocultos*
👑 ${usedPrefix}happy *Éxtasis al contemplar la eminencia*
🛡️ ${usedPrefix}hello *Saludo digno de un discípulo*
⚔️ ${usedPrefix}hug *Abrazo entre aliados en la sombra*
🌑 ${usedPrefix}kill *Eliminación con el juicio de la oscuridad*
🎶 ${usedPrefix}kiss *Compromiso sellado en la sombra*
🔱 ${usedPrefix}laugh *Risa de la eminencia al ver su destino cumplido*
💀 ${usedPrefix}love *Devoción dentro del dominio de la penumbra*
🕶️ ${usedPrefix}pat *Bendición de la eminencia hacia sus discípulos*
👁‍🗨 ${usedPrefix}poke *Provocación desde las sombras*
⚔️ ${usedPrefix}pout *Misterio reflejado en la expresión*
🌘 ${usedPrefix}punch *Golpe del destino en la oscuridad*
🛡️ ${usedPrefix}run *Huida de la luz hacia la verdadera sombra*
🔮 ${usedPrefix}sad *Tristeza por los sacrificios en la penumbra*
🔥 ${usedPrefix}scared *Terror al presenciar la eminencia en su totalidad*
⚡ ${usedPrefix}seduce *Encanto de la oscuridad sobre los débiles*
🌀 ${usedPrefix}shy *Modestia de los discípulos de Shadow*
🌑 ${usedPrefix}slap *Castigo impuesto por la sombra eterna*
👑 ${usedPrefix}sleep *Descanso bajo la protección de la penumbra*
🛡️ ${usedPrefix}think *Reflexión sobre el destino en la sombra*
𓂂𓏸  𐅹੭੭   *\`𝐀𝐑𝐓𝐄𝐅𝐀𝐂𝐓𝐎𝐒 𝐃𝐄 𝐋𝐀 𝐒𝐇𝐀𝐃𝐎𝐖 𝐆𝐀𝐑𝐃𝐄𝐍\`* 🏆🕶️
👁‍🗨 *Símbolos del poder oculto:*
🔮 ${usedPrefix}sticker *Forja un emblema de la penumbra*
🕶️ ${usedPrefix}brat *Marca a los discípulos de la eminencia*
📡 ${usedPrefix}qc *Inscripción de conocimiento oscuro*
📜 ${usedPrefix}dado *Predicción en manos de la sombra eterna*
𓂂𓏸  𐅹੭੭   *\`𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 𝐃𝐄 𝐋𝐀 𝐒𝐎𝐌𝐁𝐑𝐀\`* 💎🕶️
⚔️ *Forja tu destino en la oscuridad...*
👁‍🗨 *Extracción de poder en las sombras:*
🔮 ${usedPrefix}minar *Recolecta la energía oculta en el abismo*
🕶️ ${usedPrefix}cofre *Desbloquea los artefactos sellados*
📡 ${usedPrefix}nivel *Evalúa tu rango dentro de la Shadow Garden*
🎭 ${usedPrefix}ruleta *Deja que la oscuridad decida tu suerte*
𓂂𓏸  𐅹੭੭   *\`𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎𝐒 𝐃𝐄 𝐋𝐀 𝐄𝐌𝐈𝐍𝐄𝐍𝐂𝐈𝐀\`* 🔱👁‍🗨
⚔️ *Inscripción en los archivos de la sombra eterna...*
👑 ${usedPrefix}perfil *Consulta tu identidad dentro del dominio oscuro*
💀 ${usedPrefix}reg *Acepta el pacto con la eminencia*
🕶️ ${usedPrefix}unreg *Desvanece tu presencia en la sombra*
𓂂𓏸  𐅹੭੭   *\`𝐂𝐎𝐍𝐓𝐑𝐎𝐋 𝐃𝐄 𝐋𝐀 𝐒𝐇𝐀𝐃𝐎𝐖 𝐆𝐀𝐑𝐃𝐄𝐍\`* 🔮🛡️
👁‍🗨 *Ejecuta órdenes en el reino de la oscuridad...*
⚡ ${usedPrefix}salir *Desconexión con el plano de la eminencia*
🌑 ${usedPrefix}update *Expansión del conocimiento oculto*
🔮 ${usedPrefix}blocklist *Lista de entidades expulsadas de la sombra*
🎭 ${usedPrefix}grouplist *Inspección de los dominios oscuros*
🕶️ ${usedPrefix}restart *Renacimiento en la penumbra eterna*
👑 ${usedPrefix}join *Ingreso a los círculos secretos de la eminencia*
⚔️ ${usedPrefix}chetar *Potencia tu influencia en la Shadow Garden*
💀 ${usedPrefix}unbanuser *Liberación desde los límites del abismo*
`.trim()

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl }, // Video fijo
            caption: menu,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 999,
                externalAdReply: {
                    title: '⏤͟͞ू⃪ ፝͜⁞Sʜᴀᴅᴏᴡ✰⃔࿐\nNᴜᴇᴠᴀ Vᴇʀsɪᴏɴ Uʟᴛʀᴀ 💫',
                    thumbnailUrl: perfil,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                },
            },
            gifPlayback: true,
            gifAttribution: 0
        }, { quoted: null })
    } catch (e) {
        await m.reply(`*[ ℹ️ ] Ocurrió un error al enviar el menú.*\n\n${e}`)
    }
}

handler.help = ['menuff'];
handler.tags = ['main'];
handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.fail = null;

export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
            }
