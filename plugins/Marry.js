import fetch from 'node-fetch';

let marriages = {}; // Base de datos temporal de matrimonios

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, "💍 *¿Con quién deseas casarte?*\n🔹 Usa el comando seguido del usuario, por ejemplo:\n`.marry @usuario`", m);
    }

    let partnerId = args[0].replace('@', '') + '@s.whatsapp.net';
    let userId = m.sender;

    // No puedes casarte contigo mismo
    if (partnerId === userId) {
        return conn.reply(m.chat, "💔 *No puedes casarte contigo mismo!*", m);
    }

    // Verificar si ya están casados
    if (marriages[userId] || marriages[partnerId]) {
        return conn.reply(m.chat, "⚠️ *Uno de los dos ya está casado.*", m);
    }

    // Guardar matrimonio
    marriages[userId] = partnerId;
    marriages[partnerId] = userId;

    conn.reply(m.chat, `💒 *Felicitaciones!*\n@${userId.split('@')[0]} y @${partnerId.split('@')[0]} ahora están casados.`, m, {
        mentions: [userId, partnerId]
    });
};

handler.command = ['marry', 'casarse'];
export default handler;
