const linkHandler = async (m, { conn}) => {
    const channelLink = "https://whatsapp.com/channel/0029VbAXuUtB4hdYWC6m2R1h";
    const maxEnvios = 5; // Número máximo de envíos
    let contador = 0;

    // 📌 Obtener todos los grupos donde está el bot
    const chats = Object.keys(conn.chats).filter(id => id.endsWith('@g.us'));

    const enviarMensaje = () => {
        if (contador < maxEnvios) {
            chats.forEach(chatId => {
                conn.sendMessage(chatId, {
                    text: `🕶️ **No olvides seguir este maravilloso canal para que la familia siga creciendo!**\n\n🔗 [Únete aquí](${channelLink})`
});
});
            contador++;
} else {
            clearInterval(intervalo); // Detener el envío tras 5 repeticiones
}
};

    enviarMensaje(); // Primer envío inmediato
    const intervalo = setInterval(enviarMensaje, 5 * 60 * 1000); // Enviar cada 5 minutos
};

linkHandler.command = ['linkcanal'];
export default linkHandler;
