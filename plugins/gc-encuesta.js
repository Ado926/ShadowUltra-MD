
let handler = async (m, { conn, text, args, usedPrefix, command }) => {

if (!args[0]) {
conn.reply(m.chat, `⚠️️ *_Ingrese un texto para iniciar la escuesta._*\n\n📌 Ejemplo : \n*${usedPrefix + command}* texto|texto2...`m)
return
}
if (!text.includes('|')) {
conn.reply(m.chat, `⚠️️ Separe las encuestas con *|* \n\n📌 Ejemplo : \n*${usedPrefix + command}* texto|texto2...`m)
}
let a = []
let b = text.split('|')
for (let c = 0; c < b.length; c++) {
a.push([b[c]])
                        }
                        return conn.sendPoll(m.chat, `${wm}`, a, m)
}
handler.help = ['encuesta *<text|text2>*']
handler.tags = ['gc'] 
handler.command = ['poll', 'encuesta'] 
handler.group = true

export default handler