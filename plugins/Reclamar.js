let handler = async (m, { conn }) => {
    // Base de datos de imágenes reclamables
    const imagesReclamar = [
        "https://files.catbox.moe/ej9t74.jpg",
        "https://files.catbox.moe/4g2twd.jpg",
        "https://files.catbox.moe/7aljum.jpg",
        "https://files.catbox.moe/4ea1lz.jpg",
        "https://files.catbox.moe/ru45m3.jpg",
        "https://files.catbox.moe/9g20gv.jpg"
    ];

    // Seleccionar una imagen aleatoria para reclamar
    const randomImage = imagesReclamar[Math.floor(Math.random() * imagesReclamar.length)];

    // Mensaje para el usuario al reclamar una imagen
    const mensaje = `
✨ *¡Felicidades! Has reclamado una imagen aleatoria.* ✨
🌸 Aquí está tu recompensa:
`;

    // Enviar la imagen al usuario
    await conn.sendFile(m.chat, randomImage, "reclamar.jpg", mensaje, m);
};

handler.help = ['reclamar'];
handler.tags = ['fun', 'anime'];
handler.command = ['reclamar']; // Comando disponible

export default handler;
