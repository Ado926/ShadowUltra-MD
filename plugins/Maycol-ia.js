import axios from 'axios';

const handler = async (m, { conn, text }) => {
  if (!text) {
    conn.reply(m.chat, `⚠️ Te faltó el texto para usar *MayCode*, Usa --v2 Si Quieres usar el Modelo V2. Usa --v1 Si quieres usar el modelo V1.`, m);
    return;
  }

  // Verificar qué versión se está solicitando
  let version = 'v1'; // Versión por defecto
  let prompt = text;
  
  // Comprobar si el texto comienza con un selector de versión
  if (text.startsWith('--v1 ')) {
    version = 'v1';
    prompt = text.substring(5).trim(); // Eliminar "--v1 " del texto
  } else if (text.startsWith('--v2 ')) {
    version = 'v2';
    prompt = text.substring(5).trim(); // Eliminar "--v2 " del texto
  }

  // Mensaje de procesamiento
  await conn.reply(m.chat, `🌃 \`NightAPI\` 🌃

*Espera Que estoy Procesando tu Petición* ⏱️
*Modelo:* MayCode ${version}

> Hecho por SoyMaycol <3`, m);

  try {
    let res;
    
    // Seleccionar la URL según la versión
    if (version === 'v1') {
      res = await axios.get(`https://nightapioficial.onrender.com/api/maycode?messsge=${encodeURIComponent(prompt)}`);
      const { User, MayCode, Code } = res.data;

      const respuesta = `💻 *_MayCode ${version}_* 💻

*Tu:* ${User}

*MayCode:* ${MayCode}

*Código Que Dio MayCode 💻:* 
\`\`\`
${Code}
\`\`\`

> Usando NightAPI 🌃`;

      await conn.sendMessage(m.chat, { text: respuesta }, { quoted: m });

    } else if (version === 'v2') {
      res = await axios.get(`https://nightapioficial.onrender.com/api/maycode/models/v2/?messsge=${encodeURIComponent(prompt)}`);
      
      // Procesar respuesta del modelo v2
      // Asumiendo que tiene una estructura similar al v1, ajustar según sea necesario
      const { User = prompt, MayCode = res.data.response, Code = res.data.code } = res.data;

      const respuesta = `💻 *_MayCode ${version}_* 💻

*Tu:* ${User}

*MayCode:* ${MayCode}

*Código Que Dio MayCode 💻:* 
\`\`\`
${Code}
\`\`\`

> Usando NightAPI 🌃`;

      await conn.sendMessage(m.chat, { text: respuesta }, { quoted: m });
    }

  } catch (error) {
    console.error(error);

    await conn.sendMessage(m.chat, {
      text: `🌃 \`NightAPI\` 🌃

🚫 Uh, Ha pasado un error. Intente de nuevo más tarde 🚫

> Hecho por SoyMaycol <3`
    }, { quoted: m });
  }
};

handler.help = ['maycode'];
handler.tags = ['tools'];
handler.command = ['maycode', 'codigo'];
handler.group = false;
handler.register = true;

export default handler;
