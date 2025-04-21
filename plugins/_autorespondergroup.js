import fs from 'fs';

const handler = (m) => m;

handler.all = async function (m) {
    const chat = global.db.data.chats[m.chat];
    if (chat?.isBanned) return;

    const responses = [
        {
            regex: /^bot$/i,
            reply: "🌠 ¡Hola! Soy Shadow, ¿en qué puedo ayudarte hoy?\n\n✰ Usa *.menu* para ver mis comandos.",
        },
        {
            regex: /^English$/i,
            reply: "⭐ *The first one to speak is gay*",
        },
        {
            regex: /^Bot de mierda$/i,
            reply: "⭐ *No digas mamadas, Meriyein*",
        },
        {
            regex: /^spam$/i,
            reply: "⭐ *Escucha, gil de mrd, ni se te ocurra enviar ese tipo de contenido 🤬*",
        },
        {
            regex: /^Vendes Bot|Venden Bot|Quiero Comprar Bot|Quiero Comprar un bot$/i,
            reply: `⭐ *Claro, ¡vendemos los mejores bots!*\n\nTenemos:\n- Bot Personalizado (Plus o Normal).\n- Bot Propio.\n- Bot para Grupos.\n\nConsulta los precios.`,
        },
        {
            regex: /^Crow$/i,
            reply: `⭐ *Hola, ¿eres fan de CrowBot o Brawl Stars?*\n\nSigue el canal oficial:\nhttps://whatsapp.com/channel/0029Vb1AFK6HbFV9kaB3b13\n\nO visita el sitio web oficial de ShadowBot:\nhttps://shadow.vercel.app\n\n¡Gracias por utilizar Shadow!`,
        },
        {
            regex: /^reglasgp|.reglasgp$/i,
            reply: `⭐ **Reglas del Grupo**\n\n📸 *Presentarse al entrar.*\n🚫 No enviar mensajes privados sin permiso.\n🚫 Prohibido contenido pornográfico o violento.\n📱 No enviar spam o enlaces no autorizados.\n\nCumple las reglas y disfruta del grupo. ¡Gracias por colaborar!`,
        },
    ];

    // Buscar coincidencia con las respuestas configuradas
    for (const response of responses) {
        if (response.regex.test(m.text)) {
            conn.reply(m.chat, response.reply, m);
            return true;
        }
    }

    return false; // No coincidió con ninguna regla
};

export default handler;
