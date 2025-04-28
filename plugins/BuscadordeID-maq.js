const handler = async (m, { conn, text, args }) => {
    // Verificar que haya argumentos suficientes
    if (args.length < 4) {
        return m.reply('*[❗] Uso correcto: .miq <ID del archivo (imagen o video)> | <Texto de la cita> | <Booleano (true/false)> | <Marca de agua>*');
    }

    // Separar los argumentos
    const [id, quote, isPublic, watermark] = args.join(' ').split('|').map(a => a.trim());

    // Verificar formato correcto
    if (!id || !quote || !isPublic || !watermark) {
        return m.reply('*[❗] Los parámetros son inválidos. Asegúrate de escribir correctamente*');
    }

    // Verificar si el ID es un enlace válido de una imagen o video
    if (!id.startsWith('http') || !id.match(/\.(jpeg|jpg|png|gif|mp4)$/i)) {
        return m.reply('*[❗] El ID debe ser un enlace válido de una imagen (URL con .jpeg, .jpg, .png, .gif) o video (.mp4)*');
    }

    // Generar mensaje estilizado
    const message = `🌟 *Cita Generada* 🌟\n\n📝 *Texto:* "${quote}"\n🔓 *Público:* ${isPublic}\n💦 *Marca de agua:* ${watermark}`;

    // Enviar el archivo junto con el mensaje
    try {
        // Determinar si es una imagen o un video según la extensión
        const fileType = id.match(/\.(mp4)$/i) ? 'video.mp4' : 'imagen.jpg';
        await conn.sendFile(m.chat, id, fileType, message, m);
    } catch (error) {
        console.error('Error al enviar el archivo:', error.message);
        return m.reply('*[❗] Ocurrió un error al intentar enviar el archivo*');
    }
};

handler.command = /^miq$/i;
export default handler;
