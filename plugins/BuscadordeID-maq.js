const handler = async (m, { conn, text, args }) => {
    // Verificar que haya argumentos suficientes
    if (args.length < 4) {
        return m.reply('*[❗] Uso correcto: .miq <ID de la imagen> | <Texto de la cita> | <Booleano (true/false)> | <Marca de agua>*');
    }

    // Separar los argumentos
    const [id, quote, isPublic, watermark] = args.join(' ').split('|').map(a => a.trim());

    // Verificar formato correcto
    if (!id || !quote || !isPublic || !watermark) {
        return m.reply('*[❗] Los parámetros son inválidos. Asegúrate de escribir correctamente*');
    }

    // Verificar si el ID es un enlace válido de una imagen
    if (!id.startsWith('http') || !id.match(/\.(jpeg|jpg|png|gif)$/i)) {
        return m.reply('*[❗] El ID debe ser un enlace válido de una imagen (URL con .jpeg, .jpg, .png o .gif)*');
    }

    // Generar mensaje estilizado
    const message = `🌟 *Cita Generada* 🌟\n\n📝 *Texto:* "${quote}"\n🔓 *Público:* ${isPublic}\n💦 *Marca de agua:* ${watermark}`;

    // Enviar la imagen junto con el mensaje
    try {
        await conn.sendFile(m.chat, id, 'imagen.jpg', message, m);
    } catch (error) {
        console.error('Error al enviar la imagen:', error.message);
        return m.reply('*[❗] Ocurrió un error al intentar enviar la imagen*');
    }
};

handler.command = /^miq$/i;
export default handler;
