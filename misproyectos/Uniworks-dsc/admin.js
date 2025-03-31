const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = (client, db) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }

        const { commandName, user } = interaction;

        if (commandName === 'bonusadd') {
            // Validar que el usuario tiene un permiso específico
            const requiredPermission = 'ManageRoles'; // Cambia esto por el permiso que prefieras

            if (!interaction.member.permissions.has(requiredPermission)) {
                return interaction.reply('No tienes permiso para usar este comando.');
            }

            // Obtener información del comando
            const { options } = interaction; // Aquí estamos definiendo 'options'
            const targetUser = options.getUser('usuario');
            const descripcion = options.getString('descripcion') || 'Sin descripción';

            if (!targetUser) {
                return interaction.reply('Por favor, menciona a un usuario válido.');
            }

            // Añadir +5 puntos al usuario
            const userId = targetUser.id;
            db.get('SELECT points FROM puntos WHERE user_id = ?', [userId], (err, row) => {
                if (err) {
                    console.error(err.message);
                    return interaction.reply('Hubo un error al procesar el bono.');
                }

                const newPoints = row ? row.points + 5 : 5;

                if (row) {
                    db.run('UPDATE puntos SET points = ? WHERE user_id = ?', [newPoints, userId], (err) => {
                        if (err) console.error(err.message);
                    });
                } else {
                    db.run('INSERT INTO puntos (user_id, points) VALUES (?, ?)', [userId, newPoints], (err) => {
                        if (err) console.error(err.message);
                    });
                }

                // Registrar el bono en la tabla "bonus"
                const adminId = user.id;

                db.run('INSERT INTO bonus (admin_id, user_id, descripcion) VALUES (?, ?, ?)', 
                    [adminId, userId, descripcion], (err) => {
                    if (err) {
                        console.error(err.message);
                        return interaction.reply('El bono fue añadido, pero no se pudo registrar.');
                    }

                    interaction.reply(`¡Bono de +5 puntos añadido a ${targetUser.username}!`);
                });
            });
        }
        if (commandName === 'log-view') {
            const canalPermitidoId = '1353133732684632074'; // Reemplaza con el ID del canal permitido

            if (interaction.channel.id !== canalPermitidoId) {
                // Opcional: Responder si el mensaje no es en el canal correcto
                interaction.reply('Este no es el canal de logs. Por favor, usa el canal correcto.');
                return; // Salir de la función para ignorar el mensaje
            }
            db.all('SELECT * FROM bonus',  async (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return interaction.reply('El bono fue añadido, pero no se pudo registrar.');
                }
                if (rows) {
                    for (const row of rows) {
                        const admin = await client.users.fetch(row.admin_id);
                        const user = await client.users.fetch(row.user_id);
                        interaction.reply(`El admin ${admin} a otorgado un bonus de 5 pts a ${user} el ( ${row.fecha_bonus} ) con el concepto "${row.descripcion}"`)
                    }
                } else {
                    interaction.reply(`¡No hay bonus otorgados!`);
                }
            });
        }
        if (commandName === 'drop') {
            // Validar que el usuario tiene un permiso específico
            const requiredPermission = 'ManageRoles'; // Cambia esto por el permiso que prefieras

            if (!interaction.member.permissions.has(requiredPermission)) {
                return interaction.reply('No tienes permiso para usar este comando.');
            }
            const descripcion = interaction.options.getString('descripcion');
            const puntos = interaction.options.getInteger('puntos');
            const adminId = interaction.user.id;

            // Validar puntos
            if (puntos <= 0) {
                return interaction.reply('El número de puntos debe ser mayor que 0.');
            }

            // Guardar en la base de datos
            db.run(
                'INSERT INTO drops (admin_id, descripcion, puntos) VALUES (?, ?, ?)',
                [adminId, descripcion, puntos],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        return interaction.reply('Hubo un error al registrar el drop.');
                    }
                }
            );

            // Crear el embed
            const embed = new EmbedBuilder()
                .setColor('#FF5733') // Color del embed
                .setTitle('🎁 Regalo a la vista')
                .setDescription(`**${descripcion}**\nPuntos: **${puntos}**`)
                .setImage('https://images.wallpapersden.com/image/download/tree-alone-dark-evening-4k_bWZpam2UmZqaraWkpJRpZWWtZ2Vl.jpg') // iamgen de 400 x 200
                .setFooter({ text: `Creado por ${interaction.user.username}` });

            // Crear el botón
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('collect-drop')
                    .setLabel('Recoger')
                    .setStyle(ButtonStyle.Danger) // Botón rojo
            );

            // Enviar el embed con el botón
            const message = await interaction.reply({
                embeds: [embed],
                components: [row],
                fetchReply: true
            });

            // Manejar la interacción del botón
            const filter = (i) => i.customId === 'collect-drop';
            const collector = message.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (i) => {
                if (i.user.id === adminId) {
                    await i.reply({ content: '¡No puedes recoger tu propio drop!', ephemeral: true });
                    return;
                }

                db.get('SELECT points FROM puntos WHERE user_id = ?', [i.user.id], (err, row) => {
                    if (err) {
                        console.error(err.message);
                        return i.reply({ content: 'Hubo un error al procesar los puntos del drop.', ephemeral: true });
                    }

                    if (row) {
                        // Si el usuario ya tiene puntos, sumarlos
                        const newPoints = row.points + puntos;
                        db.run('UPDATE puntos SET points = ? WHERE user_id = ?', [newPoints, i.user.id], (updateErr) => {
                            if (updateErr) {
                                console.error(updateErr.message);
                                return i.reply({ content: 'Hubo un error al actualizar tus puntos.', ephemeral: true });
                            }
                            i.reply({ content: `¡Has recogido el drop! Ahora tienes ${newPoints} puntos.`, ephemeral: true });
                        });
                    } else {
                        // Si el usuario no tiene puntos, crearlo
                        db.run('INSERT INTO puntos (user_id, points) VALUES (?, ?)', [i.user.id, puntos], (insertErr) => {
                            if (insertErr) {
                                console.error(insertErr.message);
                                return i.reply({ content: 'Hubo un error al registrar tus puntos.', ephemeral: true });
                            }
                            i.reply({ content: `¡Has recogido el drop! Ahora tienes ${puntos} puntos.`, ephemeral: true });
                        });
                    }
                });
                collector.stop();
            });

            collector.on('end', async () => {
                if (message.editable) {
                    await message.edit({ components: [] }); // Eliminar botones al terminar el tiempo
                }
            });
        }
    });
};
