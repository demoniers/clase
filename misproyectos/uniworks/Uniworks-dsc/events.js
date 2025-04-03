const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ActionRowBuilder } = require('discord.js');

module.exports = (client, db) => {
    client.once('ready', async () => {
        await rankingEmbed(client);
        await adminEmbed(client);
    });

    client.on('interactionCreate', async (interaction) => {
        if (interaction.isButton()) {
            if (interaction.customId === 'mostrar_ranking') {
                db.all('SELECT * FROM puntos WHERE desactivado = 0 ORDER BY points DESC', async (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        return interaction.reply({ content: 'Hubo un error al consultar el ranking.', ephemeral: true });
                    }
        
                    if (!rows || rows.length === 0) {
                        return interaction.reply({ content: 'No hay datos en el ranking.', ephemeral: true });
                    }
        
                    // Construir el mensaje del ranking
                    let ranking = '**🏆 Ranking Actual 🏆**\n\n';
                    let puesto = 1;
                    rows.forEach(row => {
                        ranking += `${puesto}º | <@${row.user_id}> - ${row.points} puntos\n`;
                        puesto++;
                    });
        
                    // Responder al usuario con el ranking
                    interaction.reply({ content: ranking, ephemeral: true });
                });
            }
        }
    });

    client.on('messageCreate', (message) => {
        if (message.author.bot) {
            return; // Ignorar mensajes de bots
        }

        const userId = message.author.id;
        const channelId = "1353102826582179975";
        const categoriaID = '1353102826582179973';
        if (message.channel.id === channelId || message.channel.parentId === categoriaID) {
            db.get('SELECT points FROM puntos WHERE user_id = ? AND desactivado != 1', [userId], (err, row) => {
                if (err) {
                    console.error(err.message);
                    return;
                }

                if (row) {
                    // Si el usuario ya tiene puntos, actualizarlos
                    const newPoints = row.points + 2;
                    db.run('UPDATE puntos SET points = ? WHERE user_id = ?', [newPoints, userId], (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                } else {
                    // Si es un usuario nuevo, agregarlo
                    db.run('INSERT INTO puntos (user_id, points) VALUES (?, ?)', [userId, 2], (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                }
            });
        } else {
            return; // sino se escribe en alguno de estos canales no se contrasn los puntos
        }
    });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }
        
        const { commandName, user } = interaction;

        if (commandName === 'puntos') {
            db.get('SELECT points FROM puntos WHERE user_id = ?', [user.id], (err, row) => {
                if (err) {
                    console.error(err.message);
                    interaction.reply('Hubo un error al consultar tus puntos.');
                    return;
                }

                if (row) {
                    interaction.reply({content: `${user.username}, tienes ${row.points} puntos.`, ephemeral: true});
                } else {
                    interaction.reply({content: `${user.username}, todavía no tienes puntos.`, ephemeral: true});
                }
            });
        }

        if (commandName === 'ranking') {
            db.all('SELECT * FROM puntos ORDER BY points DESC', (err, row) => {
                if (err) {
                    console.error(err.message);
                    interaction.reply('Hubo un error al consultar el ranking.');
                    return;
                }

                if (row) {
                    let ranking = '**🏆 Ranking Actual 🏆**\n\n';
                    let puesto = 1;
                    row.forEach(r => {
                        ranking += `${puesto}º | <@${r.user_id}>  ${r.points} puntos \n`;
                        puesto++;
                    });
                    interaction.reply({content: ranking, ephemeral: true});
                }
            });
        }
    });
};

async function rankingEmbed(client) {    
    // Obtener el canal específico
    const channel = client.channels.cache.get("1356950833757163702");

    // Crear el embed
    const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🏆 Ranking de Puntos 🏆')
        .setDescription('Haz clic en el botón de abajo para mostrar el ranking actual.')
        .setFooter({ text: 'Ranking Bot', iconURL: client.user.displayAvatarURL() });

    // Crear el botón
    const button = new ButtonBuilder()
        .setCustomId('mostrar_ranking')
        .setLabel('Mostrar Ranking')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    // Enviar el mensaje con el embed y el botón
    await channel.send({ embeds: [embed], components: [row] });
}

async function adminEmbed(client) {    
    // Obtener el canal específico
    const channel = client.channels.cache.get("1356956106185769141");

    // Crear el embed
    const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Opciones de administración')
        .setDescription(`
            **----- Gestión Usuarios -----**
            1. **/comprobar_usuarios**  
               *Muestra los usuarios y permite desactivar a los inactivos o baneados.*
            
            2. **/log-view**  
               *Muestra los logs de los bonus (únicamente en #logs).*
            
            **----- Gestión Puntos -----**
            1. **/bonusadd <usuario> <descripción>**  
               *Añade un bono de 5 pts.*
            
            2. **/drop <descripción> <puntos_regalados>**  
               *Crea un drop para el primero que lo reclame.*
            
            **----- Gestión Retos -----**
            1. **/crear_reto <nombre> <recompensa> <fecha_inicio> <fecha_fin> <descripción>**  
               *Crea un reto con la información proporcionada.*
            
            2. **/listar_ganadores <reto_ID>**  
               *Muestra los ganadores de un reto.*
            
            3. **/asignar_ganador <usuario> <reto_ID>**  
               *Asigna un usuario como ganador de un reto.*
            `)            
        .setFooter({ text: 'Admin Actions', iconURL: client.user.displayAvatarURL() });

    // Crear el botón
/*    const button = new ButtonBuilder()
        .setCustomId('asignar_ganador_btn')
        .setLabel('Asignar Ganador')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);
*/
    // Enviar el mensaje con el embed y el botón
    await channel.send({ embeds: [embed], components: [row] });
}

