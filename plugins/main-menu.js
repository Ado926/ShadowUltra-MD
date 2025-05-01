import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
    try {
    let { exp, diamantes, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    exp = exp || 'Desconocida';
    role = role || 'Aldeano';

        const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length

        await m.react('💥')
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/pk3xxk.jpg')

        const videoUrl = 'https://files.catbox.moe/eggcfo.mp4' // URL fija del video

        let menu = `
ㅤㅤㅤ⩁꯭ ͡  ͡ᩚ꯭ ꯭⩁ㅤㅤ𑁯🤍ᰍㅤㅤ⩁꯭ ͡  ͡ᩚ꯭ ꯭⩁
೯ ׅ 👤 ¡Hᴏʟᴀ! ¿Cᴏᴍᴏ Esᴛᴀ́s? ׄ ᦡᦡ
ㅤ꒰͜͡${taguser}
ㅤㅤ♡𑂳ᩙㅤ ּ ${saludo} ׄ ㅤタス

*🧇 Activo:* ${uptime}
*👥 Usuarios:* ${totalreg}
*🆙 Versión:* 3.0.0

*💎 Gemas:* ${diamantes}
*💫 Exp:* ${exp}
*🫖 Nivel:* ${level}
*🍢 Rango:* ${role}
${readMore}
ㅤ ㅤ   乂 *ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs* 乂

𓂂𓏸  𐅹੭੭   *\`mᥱᥒᥙs\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🥵˚ ${usedPrefix}menunsfw
ര ׄ 🤓˚ ${usedPrefix}menuaudios
ര ׄ 🤩˚ ${usedPrefix}menuff
ര ׄ 😎˚ ${usedPrefix}menuowner
ര ׄ 😋˚ ${usedPrefix}menulogos
ര ׄ 😚˚ ${usedPrefix}menuanimes
𓂂𓏸  𐅹੭੭   *\`іᥒ𝖿᥆\`*   🫖ᩚ꤬ᰨᰍ
ര ׄ 😍˚ ${usedPrefix}totalf
ര ׄ 🥰˚ ${usedPrefix}grupos
ര ׄ 🌹˚ ${usedPrefix}sugerir
ര ׄ 👻˚ ${usedPrefix}report
ര ׄ 🧐˚ ${usedPrefix}owner
ര ׄ 🤯˚ ${usedPrefix}ping
ര ׄ 😖˚ ${usedPrefix}uptime
ര ׄ 😣˚ ${usedPrefix}horario
ര ׄ 😳˚ ${usedPrefix}precios

𓂂𓏸  𐅹੭੭   *\`᥆ᥒ - ᥆𝖿𝖿\`*   🌿ᩚ꤬ᰨᰍ
ര ׄ 😇˚ ${usedPrefix}enable *opción*
ര ׄ 🤠˚ ${usedPrefix}disable *opción*
ര ׄ 🤑˚ ${usedPrefix}on *opción*
ര ׄ 🤓˚ ${usedPrefix}off *opción*
ര ׄ 😲˚ ${usedPrefix}manual

𓂂𓏸  𐅹੭੭   *\`ძᥱsᥴᥲrgᥲs\`*   💀ᩚ꤬ᰨᰍ
ര ׄ 😹˚ ${usedPrefix} playaudio *texto*
ര ׄ 🌚˚ ${usedPrefix}aplay *texto*
ര ׄ 🌝˚ ${usedPrefix}aplayvideo *texto*
ര ׄ 😾˚ ${usedPrefix}splay *texto*
ര ׄ ❤️˚ ${usedPrefix}ytmp4doc *texto*
ര ׄ ❣️˚ ${usedPrefix}ytmp3doc *texto*
ര ׄ 💔˚ ${usedPrefix}apk *texto*
ര ׄ 👁️👄👁️˚ ${usedPrefix}pinterest *texto*
ര ׄ 🔥˚ ${usedPrefix}capcut *url*
ര ׄ ⭐˚ ${usedPrefix}pinvid *url*
ര ׄ 🤖˚ ${usedPrefix}ytmp4 *url*
ര ׄ 👻˚ ${usedPrefix}ytmp3 *url*
ര ׄ 😎˚ ${usedPrefix}tiktok *url*
ര ׄ 🤧˚ ${usedPrefix}tiktok2 *url*
ര ׄ 😳˚ ${usedPrefix}instagram *url*
ര ׄ 😥˚ ${usedPrefix}facebook *url*
ര ׄ 😤˚ ${usedPrefix}mediafire *url*
ര ׄ 🤫˚ ${usedPrefix}mega *url*
ര ׄ 🤭˚ ${usedPrefix}playstore *url*
ര ׄ 🤗˚ ${usedPrefix}xnxxdl *url*
ര ׄ 🥳˚ ${usedPrefix}xvideosdl *url*
ര ׄ 🤤˚ ${usedPrefix}pornhubdl *url*

𓂂𓏸  𐅹੭੭   *\`ᑲᥙsᥴᥲძ᥆rᥱs\`*   🔎ᩚ꤬ᰨᰍ
ര ׄ 🔎˚ ${usedPrefix}scsearch *texto*
ര ׄ 🔎˚ ${usedPrefix}aplaysearch *texto*
ര ׄ 🔎˚ ${usedPrefix}ttsearch *texto*
ര ׄ 🔎˚ ${usedPrefix}ttsearch2 *texto*
ര ׄ 🔎˚ ${usedPrefix}ytsearch *texto*
ര ׄ 🔎˚ ${usedPrefix}hpmsearch *texto*
ര ׄ 🔎˚ ${usedPrefix}spotifysearch *texto*
ര ׄ 🔎˚ ${usedPrefix}githubsearch *texto*
ര ׄ 🔎˚ ${usedPrefix}playstoresearch *texto*
ര ׄ 🔎˚ ${usedPrefix}xnxxsearch *texto*
ര ׄ 🔎˚ ${usedPrefix}xvsearch *texto*
ര ׄ 🔎˚ ${usedPrefix}pornhubsearch *texto*
ര ׄ 🔎˚ ${usedPrefix}gnula *texto*
ര ׄ 🔎˚ ${usedPrefix}mercadolibre *texto*
ര ׄ 🔎˚ ${usedPrefix}ffstalk *id*
ര ׄ 🔎˚ ${usedPrefix}animeplus *nombre del anim*
𓂂𓏸  𐅹੭੭   *\`іᥒ𝗍ᥱᥣіgᥱᥒᥴіᥲs\`*   🤖ᩚ꤬ᰨᰍ
ര ׄ 👻˚ ${usedPrefix}ia *texto*
ര ׄ 🌚˚ ${usedPrefix}shadow *texto*
ര ׄ 🥸˚ ${usedPrefix}flux *texto*
ര ׄ 😯˚ ${usedPrefix}chatgpt *texto*
ര ׄ 🤯˚ ${usedPrefix}imgg *texto*
ര ׄ 😳˚ ${usedPrefix}imgg2 *texto*
ര ׄ 🤑˚ ${usedPrefix}simi *texto*
𓂂𓏸  𐅹੭੭   *\`ᥣіs𝗍ᥲs\`*   📑ᩚ꤬ᰨᰍ
ര ׄ 🤧˚ ${usedPrefix}infem4 *hr + p*
ര ׄ 😈˚ ${usedPrefix}inmasc4 *hr + p*
ര ׄ 🤖˚ ${usedPrefix}inmixto4 *hr + p*
ര ׄ 👻˚ ${usedPrefix}infem6 *hr + p*
ര ׄ 💀˚ ${usedPrefix}inmasc6 *hr + p*
ര ׄ 👽˚ ${usedPrefix}inmixto6 *hr + p*
ര ׄ 🙊˚ ${usedPrefix}v4fem *hr + p*
ര ׄ 🌚˚ ${usedPrefix}v4masc *hr + p*
ര ׄ 🌜˚ ${usedPrefix}v4mixto *hr + p*
ര ׄ 🌛˚ ${usedPrefix}v6fem *hr + p*
ര ׄ ☺️˚ ${usedPrefix}v6masc *hr + p*
ര ׄ 😊˚ ${usedPrefix}v6mixto *hr + p*

𓂂𓏸  𐅹੭੭   *\`𝖿rᥲsᥱs\`*   🌻ᩚ꤬ᰨᰍ
ര ׄ 😍˚ ${usedPrefix}piropo
ര ׄ 🥰˚ ${usedPrefix}consejo
ര ׄ 😘˚ ${usedPrefix}fraseromantica

𓂂𓏸  𐅹੭੭   *\`ᥴ᥆ᥒ᥎ᥱr𝗍іძ᥆rᥱs\`*   😙ᩚ꤬ᰨᰍ
ര ׄ 😯˚ ${usedPrefix}tourl *img*
ര ׄ 😲˚ ${usedPrefix}tourl *aud*
ര ׄ 😮˚ ${usedPrefix}toptt *aud*
ര ׄ 😦˚ ${usedPrefix}toptt *vid*
ര ׄ 😧˚ ${usedPrefix}tourl *vid*
ര ׄ 😲˚ ${usedPrefix}tomp3 *vid*
ര ׄ 🤯˚ ${usedPrefix}toimg *sticker*

𓂂𓏸  𐅹੭੭   *\`hᥱrrᥲmіᥱᥒ𝗍ᥲs\`*   ⚒ᩚ꤬ᰨᰍ
ര ׄ ⚒️˚ ${usedPrefix}clima *texto*
ര ׄ ⚒️˚ ${usedPrefix}readmore *texto*
ര ׄ ⚒️˚ ${usedPrefix}read *texto*
ര ׄ ⚒️˚ ${usedPrefix}fake *texto + user + texto*
ര ׄ ⚒️˚ ${usedPrefix}traducir *idioma + texto*
ര ׄ ⚒️˚ ${usedPrefix}hd *img*
ര ׄ ⚒️˚ ${usedPrefix}whatmusic *aud*
ര ׄ ⚒️˚ ${usedPrefix}whatmusic *vid*
ര ׄ ⚒️˚ ${usedPrefix}flag *país*
ര ׄ ⚒️˚ ${usedPrefix}inspect *link*
ര ׄ ⚒️˚ ${usedPrefix}inspeccionar *link*
ര ׄ ⚒️˚ ${usedPrefix}nuevafotochannel
ര ׄ ⚒️˚ ${usedPrefix}nosilenciarcanal
ര ׄ ⚒️˚ ${usedPrefix}silenciarcanal
ര ׄ ⚒️˚ ${usedPrefix}seguircanal
ര ׄ ⚒️˚ ${usedPrefix}avisoschannel
ര ׄ ⚒️˚ ${usedPrefix}resiviravisos
ര ׄ ⚒️˚ ${usedPrefix}eliminarfotochannel
ര ׄ ⚒️˚ ${usedPrefix}reactioneschannel
ര ׄ ⚒️˚ ${usedPrefix}reaccioneschannel
ര ׄ ⚒️˚ ${usedPrefix}nuevonombrecanal
ര ׄ ⚒️˚ ${usedPrefix}nuevadescchannel
ര ׄ ⚒️˚ ${usedPrefix}clima
𓂂𓏸  𐅹੭੭   *\`grᥙ⍴᥆s\`*   🌵ᩚ꤬ᰨᰍ
ര ׄ 🌵˚ ${usedPrefix}add *número*
ര ׄ 🌵˚ ${usedPrefix}grupo *abrir / cerrar*
ര ׄ 🌵˚ ${usedPrefix}grouptime *tiempo*
ര ׄ 🌵˚ ${usedPrefix}notify *texto*
ര ׄ 🌵˚ Aviso *texto*
ര ׄ 🌵˚ Admins *texto*
ര ׄ 🌵˚ ${usedPrefix}todos *texto*
ര ׄ 🌵˚ ${usedPrefix}setwelcome *texto*
ര ׄ 🌵˚ ${usedPrefix}groupdesc *texto*
ര ׄ 🌵˚ ${usedPrefix}setbye *texto*
ര ׄ 🌵˚ ${usedPrefix}promote *@tag*
ര ׄ 🌵˚ ${usedPrefix}demote *@tag*
ര ׄ 🌵˚ ${usedPrefix}kick *@tag*
ര ׄ 🌵˚ ${usedPrefix}mute *@tag*
ര ׄ 🌵˚ ${usedPrefix}inactivos *opción*
ര ׄ 🌵˚ ${usedPrefix}tagnum *prefix*
ര ׄ 🌵˚ ${usedPrefix}link
ര ׄ 🌵˚ ${usedPrefix}fantasmas

𓂂𓏸  𐅹੭੭   *\`ᥱ𝖿ᥱᥴ𝗍᥆s\`*   🪻ᩚ꤬ᰨᰍ
ര ׄ 🪻˚ ${usedPrefix}bass *vid*
ര ׄ 🪻˚ ${usedPrefix}blown *vid*
ര ׄ 🪻˚ ${usedPrefix}deep *vid*
ര ׄ 🪻˚ ${usedPrefix}earrape *vid*
ര ׄ 🪻˚ ${usedPrefix}fast *vid*
ര ׄ 🪻˚ ${usedPrefix}smooth *vid*
ര ׄ 🪻˚ ${usedPrefix}tupai *vid*
ര ׄ 🪻˚ ${usedPrefix}nightcore *vid*
ര ׄ 🪻˚ ${usedPrefix}reverse *vid*
ര ׄ 🪻˚ ${usedPrefix}robot *vid*
ര ׄ 🪻˚ ${usedPrefix}slow *vid*
ര ׄ 🪻˚ ${usedPrefix}squirrel *vid*
ര ׄ 🪻˚ ${usedPrefix}chipmunk *vid*
ര ׄ 🪻˚ ${usedPrefix}reverb *vid*
ര ׄ 🪻˚ ${usedPrefix}chorus *vid*
ര ׄ 🪻˚ ${usedPrefix}flanger *vid*
ര ׄ 🪻˚ ${usedPrefix}distortion *vid*
ര ׄ 🪻˚ ${usedPrefix}pitch *vid*
ര ׄ 🪻˚ ${usedPrefix}highpass *vid*
ര ׄ 🪻˚ ${usedPrefix}lowpass *vid*
ര ׄ 🪻˚ ${usedPrefix}underwater *vid*
ര ׄ 🪻˚ ${usedPrefix} iamatomic *vid*
𓂂𓏸  𐅹੭੭   *\`ძі᥎ᥱrsі᥆ᥒ\`*   🥳ᩚ꤬ᰨᰍ
ര ׄ 🏳️‍🌈˚ ${usedPrefix}gay *@tag*
ര ׄ 🏳️‍⚧️˚ ${usedPrefix}lesbiana *@tag*
ര ׄ 🤨˚ ${usedPrefix}pajero *@tag*
ര ׄ 🥵˚ ${usedPrefix}pajera *@tag*
ര ׄ ☠️˚ ${usedPrefix}puto *@tag*
ര ׄ 💀˚ ${usedPrefix}puta *@tag*
ര ׄ 🤣˚ ${usedPrefix}manco *@tag*
ര ׄ 😂˚ ${usedPrefix}manca *@tag*
ര ׄ 🧐˚ ${usedPrefix}rata *@tag*
ര ׄ 🤨˚ ${usedPrefix}prostituto *@tag*
ര ׄ 🤨˚ ${usedPrefix}prostituta *@tag*
ര ׄ 😏 ${usedPrefix}doxear *@tag*
ര ׄ 🥴˚ ${usedPrefix}jalamela *@tag*
ര ׄ 🥺˚ ${usedPrefix}simi *texto*
ര ׄ 🥯˚ ${usedPrefix}pregunta *texto*
ര ׄ 🥸˚ ${usedPrefix}genio *texto*
ര ׄ 😼˚ ${usedPrefix}top
ര ׄ 😸˚ ${usedPrefix}sorteo
ര ׄ 😺˚ ${usedPrefix}piropo
ര ׄ 😹˚ ${usedPrefix}chiste
ര ׄ 😽˚ ${usedPrefix}facto
ര ׄ🙀 ˚ ${usedPrefix}verdad
ര ׄ😾 ˚ ${usedPrefix}pareja
ര ׄ 😸˚ ${usedPrefix}parejas
ര ׄ 😹˚ ${usedPrefix}love
ര ׄ 😼˚ ${usedPrefix}personalidad
ര ׄ 😻˚ ${usedPrefix}miq (URL mp4,jpeg,jpg,png,gif)|(descripción de lo que quieras no importa que coloques XD) |true|bella
𓂂𓏸  𐅹੭੭   *\`ȷᥙᥱg᥆s\`*   🐚ᩚ꤬ᰨᰍ
ര ׄ 👻˚ ${usedPrefix}pregunta *texto*
ര ׄ 🤧˚ ${usedPrefix}ttt *texto*
ര ׄ 😷˚ ${usedPrefix}ptt *opción*
ര ׄ 🤢˚ ${usedPrefix}delttt
ര ׄ 👿˚ ${usedPrefix}acertijo
ര ׄ 😈˚ ${usedPrefix}trivia

𓂂𓏸  𐅹੭੭   *\`ᥲᥒіmᥱ\`*   🐚ᩚ꤬ᰨᰍ
ര ׄ 😈˚ ${usedPrefix}messi
ര ׄ 👋˚ ${usedPrefix}saludo
ര ׄ 🌚˚ ${usedPrefix}buenasnoches
ര ׄ 🤒˚ ${usedPrefix}bath
ര ׄ 😷˚ ${usedPrefix}bite
ര ׄ 🤓˚ ${usedPrefix}bleh
ര ׄ ☕˚ ${usedPrefix}café
ര ׄ 🔥˚ ${usedPrefix}blush
ര ׄ 😹˚ ${usedPrefix}bored
ര ׄ 🤑˚ ${usedPrefix}cry
ര ׄ ⭐˚ ${usedPrefix}cuddle
ര ׄ 😂˚ ${usedPrefix}dance
ര ׄ 😋˚ ${usedPrefix}drunk
ര ׄ 😏˚ ${usedPrefix}eat
ര ׄ 🤐˚ ${usedPrefix}facepalm
ര ׄ 😁˚ ${usedPrefix}Happy
ര ׄ 👋˚ ${usedPrefix}Hello
ര ׄ 🫂˚ ${usedPrefix}hug
ര ׄ 😵˚ ${usedPrefix}kill
ര ׄ 😘˚ ${usedPrefix}kiss
ര ׄ 😚˚ ${usedPrefix}kiss2
ര ׄ 🥴˚ ${usedPrefix}laugh
ര ׄ 🥺˚ ${usedPrefix}love
ര ׄ 🤓˚ ${usedPrefix}pat
ര ׄ 🤐˚ ${usedPrefix}poke
ര ׄ 🤗˚ ${usedPrefix}pout
ര ׄ 🤫˚ ${usedPrefix}ppcp
ര ׄ 😐˚ ${usedPrefix}preg
ര ׄ 😱˚ ${usedPrefix}punch
ര ׄ 😒˚ ${usedPrefix}run
ര ׄ 😔˚ ${usedPrefix}sad
ര ׄ 😟˚ ${usedPrefix}scared
ര ׄ 🔥˚ ${usedPrefix}seduce
ര ׄ 😍˚ ${usedPrefix}shy
ര ׄ 😌˚ ${usedPrefix}slap
ര ׄ 🥺˚ ${usedPrefix}sleep
ര ׄ 😞˚ ${usedPrefix}smoke
ര ׄ 😜˚ ${usedPrefix}think
ര ׄ 😮˚ ${usedPrefix}rw
ര ׄ 😯˚ ${usedPrefix}c
𓂂𓏸  𐅹੭੭   *\`gі𝖿s ᥒs𝖿ա\`*   😏ᩚᰨᰍ
ര ׄ 🔥˚ ${usedPrefix}violar *@tag*
ര ׄ 🔥˚ ${usedPrefix}follar *@tag*
ര ׄ 🔥˚ ${usedPrefix}anal *@tag*
ര ׄ 🔥˚ ${usedPrefix}coger *@tag*
ര ׄ 🔥˚ ${usedPrefix}coger2 *@tag*
ര ׄ 🔥˚ ${usedPrefix}penetrar *@tag*
ര ׄ 🔥˚ ${usedPrefix}sexo *@tag*
ര ׄ 🔥˚ ${usedPrefix}rusa *@tag*
ര ׄ 🔥˚ ${usedPrefix}sixnine *@tag*
ര ׄ 🔥˚ ${usedPrefix}pies *@tag*
ര ׄ 🔥˚ ${usedPrefix}mamada *@tag*
ര ׄ 🔥˚ ${usedPrefix}lickpussy *@tag*
ര ׄ 🔥˚ ${usedPrefix}grabboobs *@tag*
ര ׄ 🔥˚ ${usedPrefix}suckboobs *@tag*
ര ׄ 🔥˚ ${usedPrefix}cum *@tag*
ര ׄ 🔥˚ ${usedPrefix}fap *@tag*
ര ׄ 🔥˚ ${usedPrefix}manosear *@tag*
ര ׄ 🔥˚ ${usedPrefix}lesbianas *@tag*
ര ׄ 🔥˚ ${usedPrefix}undress *@tag*
𓂂𓏸  𐅹੭੭   *\`s𝗍іᥴkᥱrs\`*   🍦ᩚ꤬ᰨᰍ
ര ׄ ❤️˚ ${usedPrefix}sticker *img*
ര ׄ 🧡˚ ${usedPrefix}sticker *vid*
ര ׄ 💚˚ ${usedPrefix}brat *texto*
ര ׄ 💙˚ ${usedPrefix}qc *texto*
ര ׄ 🖤˚ ${usedPrefix}dado

𓂂𓏸  𐅹੭੭   *\`r⍴g\`*   🤑ᩚ꤬ᰨᰍ
ര ׄ 💸˚ ${usedPrefix}minar
ര ׄ 💸˚ ${usedPrefix}cofre
ര ׄ 💸˚ ${usedPrefix}slut
ര ׄ 💸˚ ${usedPrefix}nivel
ര ׄ 💸˚ ${usedPrefix}ruleta

𓂂𓏸  𐅹੭੭   *\`rᥱgіs𝗍r᥆\`*   🎣ᩚ꤬ᰨᰍ
ര ׄ 👻˚ ${usedPrefix}perfil
ര ׄ 👻˚ ${usedPrefix}reg
ര ׄ 👻˚ ${usedPrefix}unreg

𓂂𓏸  𐅹੭੭   *\`᥆աᥒᥱr\`*   🍀ᩚ꤬ᰨᰍ
ര ׄ 😎˚ ${usedPrefix}salir
ര ׄ 😎˚ ${usedPrefix}update
ര ׄ 😎˚ ${usedPrefix}blocklist
ര ׄ 😎˚ ${usedPrefix}grouplist
ര ׄ 😎˚ ${usedPrefix}restart
ര ׄ😎˚ ${usedPrefix}join
ര ׄ😎 ˚${usedPrefix}chetar
ര ׄ 😎˚ ${usedPrefix}unbanuser
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
