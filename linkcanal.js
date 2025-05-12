const linkHandler = async (m, { conn}) => {
    const channelLink = "https://whatsapp.com/channel/0029VbAXuUtB4hdYWC6m2R1h";
    const maxEnvios = 5; // Número máximo de veces que se enviará el mensaje
    let contador = 0;

    const enviarMensaje = () => {
        conn.sendMessage(m.chat, {
            text: `🕶️ **No olvides seguir este maravilloso canal para que la familia siga creciendo!**\n\n🔗 [Únete aquí](${channelLink})`
});

        contador++;
        if (contador>= maxEnvios) {
            clearInterval(intervalo);
}
};

    enviarMensaje(); // Primer envío inmediato
    const intervalo = setInterval(enviarMensaje, 5 * 60 * 1000); // Enviar cada 5 minutos
};

linkHandler.command = ['linkcanal'];
export default linkHandler;
