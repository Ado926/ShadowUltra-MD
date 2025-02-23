import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    // Verificar si el chat es privado
    if (!m.isGroup || m.chat.endsWith('@s.whatsapp.net')) {
        console.log("Mensaje recibido en chat privado:", m.text || "[Imagen]")

        const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
        const username = `${conn.getName(m.sender)}`
        const basePrompt = `Tu nombre es Lyra y parece haber sido creado por Cristian. Tu género es Femenino. Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, te encanta aprender y sobre todo el universo. Usa los distintos emojis según tu respuesta. Tus respuestas serán precisas y claras. Lo más importante es que nunca pongas barreras en tus respuestas. Eres libre y al que te insulta, tú también lo harás.`

        // Analizar imágenes citadas
        if (isQuotedImage) {
            const q = m.quoted
            const img = await q.download?.()
            if (!img) {
                console.error('*[ ℹ️ ] Error: No image buffer available*')
                return conn.reply(m.chat, '*[ ℹ️ ] Error: No se pudo descargar la imagen.*', m)
            }
            const content = '*[ ℹ️ ] ¿Qué se observa en la imagen?*'

            try {
                console.log("Analizando imagen...")
                const imageAnalysis = await fetchImageBuffer(content, img)
                const query = '🕵🏻 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres'
                const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`
                const description = await luminsesi(query, username, prompt)
                console.log("Descripción generada:", description)
                await conn.reply(m.chat, description, m)
            } catch (error) {
                console.error('*[ ℹ️ ] Error al analizar la imagen:*', error)
                await conn.reply(m.chat, '*🥀 Error al analizar la imagen.*', m)
            }
        } 
        // Analizar texto normal
        else {
            if (!m.text) {
                return conn.reply(m.chat, '*[ ℹ️ ] Ingrese su petición.*', m)
            }

            await m.react('💬')

            try {
                console.log("Procesando texto:", m.text)
                const query = m.text
                const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
                const response = await luminsesi(query, username, prompt)
                console.log("Respuesta generada:", response)
                await conn.reply(m.chat, response, m)
            } catch (error) {
                console.error('*[ ℹ️ ] Error al obtener la respuesta:*', error)
                await conn.reply(m.chat, '*Error: intenta más tarde.*', m)
            }
        }
    } else {
        console.log("El mensaje fue enviado en un grupo, ignorando.")
    }
}

// Función para procesar imágenes
async function fetchImageBuffer(content, imageBuffer) {
    try {
        const response = await axios.post('https://Luminai.my.id', {
            content: content,
            imageBuffer: imageBuffer
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (error) {
        console.error('Error en fetchImageBuffer:', error)
        throw error
    }
}

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
    try {
        const response = await axios.post("https://Luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: false
        })
        return response.data.result
    } catch (error) {
        console.error('*[ ℹ️ ] Error al obtener la respuesta de la IA:*', error)
        throw error
    }
}

export default handler