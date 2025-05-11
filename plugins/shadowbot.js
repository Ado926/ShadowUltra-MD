import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.reply(m.chat, `
✘ 「 𝑴𝑬𝑵𝑺𝑨𝑱𝑬 𝑭𝑨𝑳𝑻𝑨𝑵𝑻𝑬 」
➤ Usa: *mrbeast ¿Cuál es el secreto del universo?*`, m);
  }

  const prompt = `te llamas shadow. responde cono shadowbot. alguien te conocer: ${text}`;
  const api = `https://nightapioficial.onrender.com/api/gemini?message=${encodeURIComponent(prompt)}`;

  await conn.reply(m.chat, `
╭─〔 𝕄𝕒𝕪𝕔𝕠𝕝𝔸𝕀𝕌𝕝𝕥𝕣𝕒𝕄𝔻 ✦ 𝑬𝑺𝑪𝑼𝑪𝑯𝑨 𝑻𝑼 𝑺𝑼𝑷𝑳𝑰𝑪𝑨... 〕─╮
┃⌛ 𝑷𝒆𝒏𝒔𝒂𝒏𝒅𝒐 𝒅𝒆𝒔𝒅𝒆 𝒆𝒍 𝒎𝒂́𝒔 𝒂𝒍𝒍𝒂́...
╰────────────────────────────╯`, m);

  try {
    const res = await fetch(api);
    const data = await res.json();

    if (!data || !data.result) throw new Error('Respuesta vacía');

    await conn.reply(m.chat, `
╭─〔 𝕄𝕒𝕪𝕔𝕠𝕝𝔸𝕀𝕌𝕝𝕥𝕣𝕒𝕄𝔻 ✦ 𝑹𝑬𝑺𝑷𝑼𝑬𝑺𝑻𝑨 〕─╮
${data.result.trim()}
> Usando NightAPI 🌌 & Hecho por SoyMaycol
╰────────────────────────────╯`, m);
  } catch (err) {
    console.error('[ERROR en Hanako IA]', err);
    conn.reply(m.chat, `
✘ 「 𝑶𝑯 𝑵𝑶... 」
➤ 𝕄𝕒𝕪𝕔𝕠𝕝𝔸𝕀𝕌𝕝𝕥𝕣𝕒𝕄𝔻 no pudo conectarse con la sabiduría.
➤ Intenta de nuevo más tarde.`, m);
  }
};

handler.command = ['shadowbot'];
handler.help = ['shadowbot <pregunta>'];
handler.tags = ['ai'];
handler.register = true;

export default handler;
