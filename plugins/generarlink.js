const axios = require('axios');
const FormData = require('form-data');

async function gerarLink(m, conn) {
    try {
        const mediaObject = m.message.imageMessage || m.message.videoMessage;
        if (!mediaObject) return conn.reply(m.chat, "❌ No se encontró ningún archivo adjunto.", m);

        const buffer = await getFileBuffer(mediaObject, mediaObject.mimetype.includes("video") ? "video" : "image");
        let form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("fileToUpload", buffer, { filename: mediaObject.mimetype.includes("video") ? "video.mp4" : "upload.jpg" });

        const res = await axios.post("https://catbox.moe/user/api.php", form, { headers: form.getHeaders() });

        await conn.sendMessage(m.chat, { text: `✅ Enlace generado:\n🔗 ${res.data}` }, { quoted: m });

    } catch (error) {
        console.error("Error:", error);
        await conn.reply(m.chat, "❌ Error al generar el enlace.", m);
    }
}

handler.command = ["gerarlink"];
export default handler;
