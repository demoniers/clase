const { ModalBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ComponentType } = require('discord.js');

module.exports = (client, db) => {
    client.once('ready', async () => {
        await rankingEmbed(client);
        await adminEmbed(client);
    });

    client.on('interactionCreate', async (interaction) => {
        if (interaction.isButton()) {
            if (interaction.customId === 'mostrar_ranking') {
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

            if (interaction.customId === 'asignar_ganador_btn') {
                const modal = new ModalBuilder()
                    .setCustomId('modal_asignar_ganador')
                    .setTitle('Asignar Ganador');

                // Crear el menú de selección de usuarios
                const usuarioSelectMenu = new UserSelectMenuBuilder()
                    .setCustomId('usuario_id')
                    .setPlaceholder('Selecciona un usuario')
                    .setMinValues(1)
                    .setMaxValues(1);                

                // Crear el campo de texto para el ID del reto
                const retoInput = new TextInputBuilder()
                    .setCustomId('reto_id')
                    .setLabel('ID del Reto')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                // Agregar los componentes al modal
                modal.addComponents(
                    new ActionRowBuilder().addComponents(usuarioSelectMenu),
                    new ActionRowBuilder().addComponents(retoInput)
                );

                // Mostrar el modal
                await interaction.showModal(modal);
            }
        }

        if (interaction.isModalSubmit() && interaction.customId === 'modal_asignar_ganador') {
            await interaction.reply({ content: 'Procesando datos...', ephemeral: true });

            // Recuperar los datos ingresados en el modal
            const usuarioID = interaction.fields.getFieldValue('usuario_id'); // Método corregido
            const retoID = interaction.fields.getTextInputValue('reto_id');

            // Validar que el usuario tenga el permiso necesario
            const requiredPermission = 'EventManager';
            if (!interaction.member.permissions.has(requiredPermission)) {
                return interaction.reply({ content: 'No tienes permiso para realizar esta acción.', ephemeral: true });
            }

            // Validar el canal correcto para la asignación
            const createChannelId = "1356890716629893170";
            if (interaction.channel.id !== createChannelId) {
                return interaction.reply({ content: 'Este comando solo puede ejecutarse en el canal correcto.', ephemeral: true });
            }

            // Validar si el reto existe en la base de datos
            db.get('SELECT nombre FROM retos WHERE id = ?', [retoID], (err, reto) => {
                if (err) {
                    console.error(err.message);
                    return interaction.reply({ content: 'Error al validar el reto.', ephemeral: true });
                }

                if (!reto) {
                    return interaction.reply({ content: 'El reto especificado no existe.', ephemeral: true });
                }

                // Registrar al ganador en la base de datos
                const fechaGanado = new Date().toISOString();
                db.run(`INSERT INTO ganadores (usuario_id, reto_id, fecha_ganado) VALUES (?, ?, ?)`,
                    [usuarioID, retoID, fechaGanado],
                    function (err) {
                        if (err) {
                            console.error(err.message);
                            return interaction.reply({ content: 'Error al asignar al ganador.', ephemeral: true });
                        }

                        db.get('SELECT recompensa FROM retos WHERE id = ?', [retoID], function (err, row) {
                            if (err) {
                                console.error(err.message);
                                return interaction.reply({ content: 'Error al obtener los datos del reto.', ephemeral: true });
                            }
                            if (row) {
                                const recompensa = row.recompensa;

                                db.get('SELECT points FROM puntos WHERE user_id = ?', [usuarioID], function (err, puntosRow) {
                                    if (err) {
                                        console.error(err.message);
                                        return interaction.reply({ content: 'Error al buscar los puntos del usuario.', ephemeral: true });
                                    }

                                    if (puntosRow) {
                                        const puntosUser  = puntosRow.points;
                                        const nuevoPuntos = puntosUser  + recompensa;

                                        db.run('UPDATE puntos SET points = ? WHERE user_id = ?', [nuevoPuntos, usuarioID], function (err) {
                                            if (err) {
                                                console.error(err.message);
                                                return interaction.reply({ content: 'Error al actualizar los puntos.', ephemeral: true });
                                            }
                                        });
                                    }
                                });
                            }
                        });

                        // Confirmar el registro del ganador
                        const embed = new EmbedBuilder()
                            .setColor('#FFD700')
                            .setTitle('🎉 Ganador Asignado')
                            .setDescription(`👤 **Usuario:** <@${usuarioID}>\n🎯 **Reto:** ${reto.nombre}\n📅 **Fecha:** ${new Date(fechaGanado).toLocaleDateString()}`)
                            .setFooter({ text: `Asignado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

                        const canalID = '1356911041799262341';
                        const canal = interaction.guild.channels.cache.get(canalID);
                        canal.send({ embeds: [embed] });
                    }
                );
            });
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
        .setDescription('Haz clic en la opción de abajo.')
        .setFooter({ text: 'Admin Actions', iconURL: client.user.displayAvatarURL() });

    // Crear el botón
    const button = new ButtonBuilder()
        .setCustomId('asignar_ganador_btn')
        .setLabel('Asignar Ganador')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    // Enviar el mensaje con el embed y el botón
    await channel.send({ embeds: [embed], components: [row] });
}

