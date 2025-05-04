module.exports = {
  name: "teta",
  alias: ["tetas"], // Puedes añadir alias si lo deseas
  run: async ({ client, message }) => {
    await client.sendMessage(message.chat, {
      text: "Que caliente eres 😳💦\nÚnete a nuestro canal de WhatsApp: https://whatsapp.com/channel/0029VbAXuUtB4hdYWC6m2R1h",
      quoted: message, // Para que responda como cita
    });
  },
};
