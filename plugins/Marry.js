import fetch from 'node-fetch';

let marriages = {}; // Base de datos temporal de matrimonios

const handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, "💍 *¿Con quién deseas casarte?*\n🔹 Usa el comando seguido del usuario, por ejemplo:\n`.marry @usuario`", m);

    let partner = args[0].replace('@', '') + '@s.whatsapp.net';
    let user = m.sender;
    
    // Si ya están casados
    if (marriages
