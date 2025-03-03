/*import axios from 'axios';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `*[ ℹ️ ] Ingresa el ID de un usuario de Free Fire que quieras stalkear*`, m);

    try {
        let api = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`);
        let json = api.data;
        if (!json.status) return conn.reply(m.chat, "*[ ❌ ] No se encontraron resultados*", m);

        let { account, pet_info = {}, guild = {}, ketua_guild = {}, equippedItems = {} } = json.data;
        let { id, name, level, xp, region, like, bio, create_time, last_login, honor_score, booyah_pass, BR_points, CS_points } = account;

        let { name: petName = "Sin mascota", level: petLevel = 0, xp: petXP = 0 } = pet_info;
        let { name: guildName = "Sin clan", level: guildLevel = 0, member = 0, capacity = 0 } = guild;
        let equipped_title = equippedItems?.Title?.[0]?.name || "Ninguno";

        let HS = `*[ INFO - USUARIO ]*
- *Usuario:* ${name}
- *Nivel:* ${level}
- *XP:* ${xp}
- *Región:* ${region}
- *Like:* ${like}
- *Bio:* ${bio || "No disponible"}
- *Fecha de Creación:* ${create_time}
- *Último Inicio de Sesión:* ${last_login}
- *Honor Score:* ${honor_score}
- *Booyah Pass:* ${booyah_pass ? "Sí" : "No"}
- *Puntos BR:* ${BR_points}
- *Puntos CS:* ${CS_points}
- *Título Equipado:* ${equipped_title}

*[ INFO - MASCOTA ]*
  - *Nombre:* ${petName}
  - *Nivel:* ${petLevel}
  - *XP:* ${petXP}

*[ INFO - CLAN ]*
  - *Nombre del clan:* ${guildName}
  - *Nivel del clan:* ${guildLevel}
  - *Miembros:* ${member} / ${capacity} miembros
`;

        if (ketua_guild.name) {
            HS += `\n*[ INFO - LÍDER DEL CLAN ]*
  - *Nombre:* ${ketua_guild.name}
  - *Nivel:* ${ketua_guild.level}
  - *XP:* ${ketua_guild.xp}
  - *Puntos BR:* ${ketua_guild.BR_points}
  - *Puntos CS:* ${ketua_guild.CS_points}
  - *Like:* ${ketua_guild.like}
  - *Fecha de Creación:* ${ketua_guild.create_time}
  - *Último Inicio de Sesión:* ${ketua_guild.last_login}`;
        }

        await conn.sendMessage(m.chat, { text: HS }, { quoted: m });
    } catch (error) {
        console.error("Error en la API:", error);
        conn.reply(m.chat, "Hubo un error al obtener los datos. Intenta de nuevo más tarde.", m);
    }
};

handler.command = ['freefirestalk', 'ffstalk', 'ffs'];
handler.register = true
export default handler;*/

import axios from 'axios';

let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, "*[ 🪙 ] Ingresa el ID de un usuario de Free Fire que quieras stalkear*", m);
    }

    try {
        let { data: json } = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`, { timeout: 10000 });

        if (!json?.status) {
            return conn.reply(m.chat, "*[ ❌ ] No se encontraron resultados para este ID*", m);
        }

        let {
            account = {},
            pet_info = {},
            guild = {},
            ketua_guild = {},
            equippedItems = {},
        } = json.data || {};

        let {
            id = "Desconocido",
            name = "Sin nombre",
            level = "Desconocido",
            xp = 0,
            region = "No especificado",
            like = 0,
            bio = "No disponible",
            create_time = "Desconocido",
            last_login = "Desconocido",
            honor_score = 0,
            booyah_pass = false,
            BR_points = 0,
            CS_points = 0,
        } = account;

        let {
            name: petName = "Sin mascota",
            level: petLevel = 0,
            xp: petXP = 0,
        } = pet_info;

        let {
            name: guildName = "Sin clan",
            level: guildLevel = 0,
            member = 0,
            capacity = 0,
        } = guild;

        let equipped_title = equippedItems?.Title?.[0]?.name || "Ninguno";

        let HS = `*[ INFO - USUARIO ]*
- *Usuario:* ${name}
- *Nivel:* ${level}
- *XP:* ${xp}
- *Región:* ${region}
- *Like:* ${like}
- *Bio:* ${bio}
- *Fecha de Creación:* ${create_time}
- *Último Inicio de Sesión:* ${last_login}
- *Honor Score:* ${honor_score}
- *Booyah Pass:* ${booyah_pass ? "Sí" : "No"}
- *Puntos BR:* ${BR_points}
- *Puntos CS:* ${CS_points}
- *Título Equipado:* ${equipped_title}

*[ INFO - MASCOTA ]*
  - *Nombre:* ${petName}
  - *Nivel:* ${petLevel}
  - *XP:* ${petXP}

*[ INFO - CLAN ]*
  - *Nombre del clan:* ${guildName}
  - *Nivel del clan:* ${guildLevel}
  - *Miembros:* ${member} / ${capacity} miembros
`;

        if (ketua_guild?.name) {
            HS += `\n*[ INFO - LÍDER DEL CLAN ]*
  - *Nombre:* ${ketua_guild.name || "Desconocido"}
  - *Nivel:* ${ketua_guild.level || 0}
  - *XP:* ${ketua_guild.xp || 0}
  - *Puntos BR:* ${ketua_guild.BR_points || 0}
  - *Puntos CS:* ${ketua_guild.CS_points || 0}
  - *Like:* ${ketua_guild.like || 0}
  - *Fecha de Creación:* ${ketua_guild.create_time || "Desconocida"}
  - *Último Inicio de Sesión:* ${ketua_guild.last_login || "Desconocido"}`;
        }

        await conn.sendMessage(m.chat, { text: HS }, { quoted: m });
    } catch (error) {
        console.error("Error en la API:", error);
        let errorMsg = "Hubo un error al obtener los datos. Intenta de nuevo más tarde.";

        if (error.response) {
            errorMsg += `\n\n*Detalles del error:*\n- Código: ${error.response.status}\n- Mensaje: ${error.response.statusText}`;
        } else if (error.code === "ECONNABORTED") {
            errorMsg += "\n\nLa API tardó demasiado en responder. Inténtalo más tarde.";
        }

        conn.reply(m.chat, errorMsg, m);
    }
};

handler.command = ['freefirestalk', 'ffstalk', 'ffs'];
handler.register = true;
export default handler;