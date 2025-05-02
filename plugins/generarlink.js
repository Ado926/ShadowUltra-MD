case 'gerarlink':
  try {
    const axios = require('axios');
    const FormData = require('form-data');
    let form = new FormData();

    if (((!isMedia && !info.message.videoMessage) || isQuotedImage) && q.length <= 1) {
      await reagir(from, "📤");
      const mediaObject = isQuotedImage
        ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.imageMessage
        : info.message.imageMessage;

      const buffer = await getFileBuffer(mediaObject, 'image');

      form = new FormData();
      form.append('reqtype', 'fileupload');
      form.append('fileToUpload', buffer, { filename: 'upload.jpg' });

      const res = await axios.post('https://catbox.moe/user/api.php', form, {
        headers: form.getHeaders()
      });

      await socket.sendMessage(from, { text: res.data }, { quoted: selo });
      await reagir(from, "✅️");

    } else if (((isMedia && info.message.videoMessage.seconds < 30) ||
                (isQuotedVideo && info.message.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.seconds < 30)) && q.length <= 1) {
      
      await reagir(from, "📤");
      const mediaObject = isQuotedVideo
        ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.videoMessage
        : info.message.videoMessage;

      const buffer = await getFileBuffer(mediaObject, 'video');

      form = new FormData();
      form.append('reqtype', 'fileupload');
      form.append('fileToUpload', buffer, { filename: 'video.mp4' });

      const res = await axios.post('https://catbox.moe/user/api.php', form, {
        headers: form.getHeaders()
      });

      await socket.sendMessage(from, { text: res.data }, { quoted: selo });
      await reagir(from, "✅️");

    } else {
      await reagir(from, "😿");
      reply("Você deve marcar uma imagem ou um vídeo de até 30 segundos.");
    }
  } catch (e) {
    console.log(e);
    await reagir(from, "❌️");
    reply("Erro ao tentar gerar o link do arquivo.");
  }
  break;
