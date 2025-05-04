import { totalmem, freemem } from 'os'
import os from 'os'
import util from 'util'
import osu from 'node-os-utils'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

const format = sizeFormatter({ 
  std: 'JEDEC', 
  decimalPlaces: 2, 
  keepTrailingZeroes: false, 
  render: (literal, symbol) => `${literal} ${symbol}B` 
})

var handler = async (m, { conn }) => {
  let timestamp = speed()
  let latensi = speed() - timestamp

  let _muptime = process.uptime() * 1000
  let muptime = clockString(_muptime)

  let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])

  let usedMem = format(totalmem() - freemem())
  let totalMem = format(totalmem())

  let texto = `
╭━━━〔 *${packname}* 〕━━━⬣
┃
┃ ⏱️ *Velocidad:* ${latensi.toFixed(4)} ms
┃ ⏳ *Activo durante:* ${muptime}
┃
┃ 💬 *Chats:*
┃    • Privados: ${chats.length}
┃    • Grupos: ${groups.length}
┃
┃ 🖥️ *Servidor:*
┃    • RAM usada: ${usedMem}
┃    • RAM total: ${totalMem}
┃
╰━━〔 ⚙️ Sistema Estable 〕━⬣
`.trim()

  m.react('⚡')
  conn.reply(m.chat, texto, m)
}

handler.help = ['speed']
handler.tags = ['info']
handler.command = ['speed']
handler.register = true

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
