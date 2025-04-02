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
            const requiredPermission = 'Administrador'; // Cambia esto por el permiso que prefieras

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
                    let mensajeEnv;
                    for (const row of rows) {
                        const admin = await client.users.fetch(row.admin_id);
                        const user = await client.users.fetch(row.user_id);
                        mensajeEnv += `El admin ${admin} a otorgado un bonus de 5 pts a ${user} el ( ${row.fecha_bonus} ) con el concepto "${row.descripcion}"\n`
                    }
                    interaction.reply(mensajeEnv);
                } else {
                    interaction.reply(`¡No hay bonus otorgados!`);
                }
            });
        }
        if (commandName === 'drop') {
            // Validar que el usuario tiene un permiso específico
            const requiredPermission = 'Administrador'; // Cambia esto por el permiso que prefieras

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
        if (commandName === 'comprobar_usuarios') {
            await interaction.reply({ content: 'Procesando usuarios...', ephemeral: true });
            // Validar que el usuario tiene un permiso específico
            const requiredPermission = 'Encargado'; // Cambia esto por el permiso que prefieras

            if (!interaction.member.permissions.has(requiredPermission)) {
                return interaction.reply('No tienes permiso para usar este comando.');
            }
            db.all('SELECT * FROM puntos WHERE desactivado = 0 AND desactivado != 1', async (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return interaction.reply({ content: 'Hubo un error al obtener los datos de la base de datos.', ephemeral: true });
                }
        
                if (rows.length === 0) {
                    return interaction.reply({ content: 'No hay usuarios pendientes de desactivar.', ephemeral: true });
                }
                let index = 0;
                const handleUser = async () => {
                    if (index >= rows.length) {
                        return interaction.followUp({ content: 'Se han procesado todos los usuarios.', ephemeral: true });
                    }
            
                    const user = rows[index]; // Primero obtenemos el usuario desde la base de datos.
            
                    // Intentar obtener el usuario de Discord desde su ID
                    const discordUser = await client.users.fetch(user.user_id).catch((err) => {
                        console.error(`No se pudo obtener el usuario con ID: ${user.user_id}`, err);
                    });
            
                    if (!discordUser) {
                        // Si no se pudo obtener el usuario, pasa al siguiente
                        console.error(`Usuario con ID ${user.user_id} no encontrado en Discord.`);
                        index++;
                        return handleUser();
                    }
            
                    const embed = new EmbedBuilder()
                        .setColor('#FF5733')
                        .setTitle('¿Desactivar este usuario?')
                        .setDescription(`👤 **Usuario:** ${discordUser.username}\n🌟 **Puntos:** ${user.points}`)
                        .setFooter({ text: `Creado por ${interaction.user.username}` });
            
                    const buttonNo = new ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('No')
                        .setStyle(ButtonStyle.Success);
            
                    const buttonSi = new ButtonBuilder()
                        .setCustomId('si')
                        .setLabel('Sí')
                        .setStyle(ButtonStyle.Danger);
            
                    const row = new ActionRowBuilder().addComponents(buttonNo, buttonSi);
            
                    const message = await interaction.followUp({
                        embeds: [embed],
                        components: [row],
                        ephemeral: true,
                    });
            
                    // Crear un filtro para que sólo el usuario que ejecutó el comando interactúe
                    const filter = (i) => i.user.id === interaction.user.id;
                    const collector = message.createMessageComponentCollector({ filter, time: 60000 });
            
                    collector.on('collect', async (btnInteraction) => {
                        if (btnInteraction.customId === 'si') {
                            // Actualizar la base de datos para desactivar al usuario
                            db.run('UPDATE puntos SET desactivado = 1 WHERE user_id = ?', [user.user_id], (updateErr) => {
                                if (updateErr) {
                                    console.error(updateErr.message);
                                    return btnInteraction.reply({ content: 'Hubo un error al actualizar el usuario.', ephemeral: true });
                                }
            
                                btnInteraction.reply({ content: `Usuario **${discordUser.username}** desactivado correctamente.`, ephemeral: true });
                            });
                        } else {
                            btnInteraction.reply({ content: `Usuario **${discordUser.username}** no desactivado.`, ephemeral: true });
                        }
            
                        collector.stop(); // Detener el colector después de la interacción
                    });
            
                    collector.on('end', () => {
                        index++; // Pasar al siguiente usuario
                        handleUser(); // Continuar con el siguiente usuario
                    });
                };
            
                handleUser(); // Iniciar con el primer usuario
            });
        }
        if (commandName === 'crear_reto') {
            await interaction.reply({ content: 'Procesando...', ephemeral: true });
        
            // Validar que el usuario tenga un permiso específico
            const requiredPermission = 'EventManager'; // Cambia esto si es necesario
        
            if (!interaction.member.permissions.has(requiredPermission)) {
                return interaction.reply('No tienes permiso para usar este comando.');
            }
            const createChannelId = "1356890716629893170";
            if (interaction.channel.id === createChannelId) {
                // Solicitar datos para el reto
                const nombre = interaction.options.getString('nombre');
                const descripcion = interaction.options.getString('descripcion') || 'Sin descripción.';
                const recompensa = interaction.options.getInteger('recompensa');
                const fechaInicio = interaction.options.getString('fecha_inicio');
                const fechaFin = interaction.options.getString('fecha_fin');
            
                // Agregar el reto a la base de datos
                db.run(
                    `INSERT INTO retos (nombre, descripcion, recompensa, fecha_inicio, fecha_fin)
                    VALUES (?, ?, ?, ?, ?)`,
                    [nombre, descripcion, recompensa, fechaInicio, fechaFin],
                    function (err) {
                        if (err) {
                            console.error(err.message);
                            return interaction.reply({ content: 'Hubo un error al guardar el reto.', ephemeral: true });
                        }
            
                        const embed = new EmbedBuilder()
                            .setColor('#FFA500') // Naranja, color llamativo
                            .setTitle('Nuevo Reto Semanal Creado')
                            .setDescription(`📝 **Nombre:** ${nombre}\n\n📋 **Descripción:** ${descripcion}\n\n💰 **Recompensa:** ${recompensa} monedas\n\n📅 **Fecha de Inicio:** ${fechaInicio}\n📅 **Fecha de Fin:** ${fechaFin}`)
                            .setFooter({ text: `Creado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
            
                        const canalID = '1356907093046722581';
                        const canal = interaction.guild.channels.cache.get(canalID);
                        canal.send({ embeds: [embed] });
                        return interaction.followUp({
                            content: '¡Reto creado exitosamente!',
                            ephemeral: true
                        });
                    }
                );
            } else {
                return interaction.followUp ({
                    content: 'El canal no es el correcto',
                    ephemeral: true
                })
            }
        }
        

        if (commandName === 'asignar_ganador') {
            await interaction.reply({ content: 'Procesando...', ephemeral: true });
        
            // Validar que el usuario tenga un permiso específico
            const requiredPermission = 'EventManager'; // Cambia esto si es necesario
        
            if (!interaction.member.permissions.has(requiredPermission)) {
                return interaction.reply('No tienes permiso para usar este comando.');
            }
            const createChannelId = "1356890716629893170";
            if (interaction.channel.id === createChannelId) {

                // Obtener los parámetros
                const usuario = interaction.options.getUser('usuario');
                if (!usuario) {
                    return interaction.reply({ content: 'Por favor, selecciona un usuario válido.', ephemeral: true });
                }
                const usuarioID = usuario.id;
                const retoID = interaction.options.getInteger('reto_id'); // ID del reto
            
                // Validar si el reto existe en la base de datos
                db.get(`SELECT nombre FROM retos WHERE id = ?`, [retoID], (err, reto) => {
                    if (err) {
                        console.error(err.message);
                        return interaction.reply({ content: 'Hubo un error al validar el reto.', ephemeral: true });
                    }
            
                    if (!reto) {
                        return interaction.reply({ content: 'El reto especificado no existe.', ephemeral: true });
                    }
            
                    // Registrar al ganador en la base de datos
                    const fechaGanado = new Date().toISOString(); // Fecha actual
                    db.run(
                        `INSERT INTO ganadores (usuario_id, reto_id, fecha_ganado)
                         VALUES (?, ?, ?)`,
                        [usuarioID, retoID, fechaGanado],
                        function (err) {
                            if (err) {
                                console.error(err.message);
                                return interaction.reply({ content: 'Hubo un error al asignar al ganador.', ephemeral: true });
                            }
                            db.get('SELECT recompensa FROM retos WHERE id = ?', [retoID], function (err, row) {
                                if (err) {
                                    console.error(err.message);
                                    return interaction.reply({ content: 'Hubo un error al buscar el reto.', ephemeral: true });
                                }
                                if (row) {
                                    const recompensa = row.recompensa;
                                    db.get('SELECT points FROM puntos WHERE user_id = ?', [usuarioID], function (err, row) {
                                        if (err) {
                                            console.error(err.message);
                                            return interaction.reply({ content: 'Hubo un error al buscar el usuario.', ephemeral: true });
                                        }
                                        if (row) {
                                            const puntosUser = row.points;
                                            const nuevoPuntos = puntosUser+recompensa;
                                            db.run('UPDATE puntos SET points = ? WHERE user_id = ?', [nuevoPuntos, usuarioID], 
                                                function (err) {
                                                    if (err) {
                                                        console.error(err.message);
                                                        return interaction.reply({ content: 'Hubo un error al actualizar los puntos.', ephemeral: true });
                                                    }
                                            });
                                        }
                                    });
                                }
                            });
            
                            // Confirmar el registro del ganador
                            const embed = new EmbedBuilder()
                                .setColor('#FFD700') // Dorado para simbolizar un ganador
                                .setTitle('🎉 Ganador Asignado')
                                .setDescription(`¡Se ha asignado un ganador al reto!\n\n👤 **Usuario:** <@${usuarioID}>\n🎯 **Reto:** ${reto.nombre}\n📅 **Fecha:** ${new Date(fechaGanado).toLocaleDateString()}`)
                                .setFooter({ text: `Asignado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
            
                            const canalID = '1356911041799262341';
                            const canal = interaction.guild.channels.cache.get(canalID);
                            canal.send({ embeds: [embed] });
                        }
                    );
                });
            } else {
                return interaction.followUp ({
                    content: 'El canal no es el correcto',
                    ephemeral: true
                })
            }
        }
        if (commandName === 'listar_ganadores') {
            await interaction.reply({ content: 'Procesando...', ephemeral: true });
        
            // Validar que el usuario tenga un permiso específico
            const requiredPermission = 'EventManager'; // Cambia esto si es necesario
        
            if (!interaction.member.permissions.has(requiredPermission)) {
                return interaction.reply('No tienes permiso para usar este comando.');
            }
            const winnerChannelId = "1356911041799262341";
            if (interaction.channel.id === winnerChannelId) {
                const retoID = interaction.options.getInteger('reto_id'); // ID del reto

                // Consultar la base de datos para obtener los ganadores
                db.all(
                    `SELECT ganadores.usuario_id, ganadores.fecha_ganado, retos.nombre AS reto_nombre
                    FROM ganadores
                    INNER JOIN retos ON ganadores.reto_id = retos.id
                    WHERE retos.id = ?
                    ORDER BY ganadores.fecha_ganado DESC`, [retoID],
                    async (err, rows) => {
                        if (err) {
                            console.error(err.message);
                            return interaction.reply({ content: 'Hubo un error al obtener los datos de los ganadores.', ephemeral: true });
                        }

                        if (rows.length === 0) {
                            return interaction.followUp({ content: 'No hay ganadores registrados.', ephemeral: true });
                        }
                        let mensaje = '**🏆 Ganadores de Retos 🏆**\n\n';

                        for (const row of rows) {
                            try {
                                const usuario = await client.users.fetch(row.usuario_id);
                                const mencionUser = usuario.toString(); // Genera la mención @Usuario
                        
                                // Añadir al mensaje
                                mensaje += `👤 **Usuario:** ${mencionUser}\n`;
                                mensaje += `🌟 **Reto:** ${row.reto_nombre}\n`;
                                mensaje += `📅 **Fecha:** ${new Date(row.fecha_ganado).toLocaleDateString()}\n\n`;
                            } catch (error) {
                                console.error(`Error al obtener el usuario con ID ${row.usuario_id}:`, error);
                        
                                // Añadir un mensaje de error al texto
                                mensaje += `👤 **Usuario:** ID no válido\n`;
                                mensaje += `🌟 **Reto:** ${row.reto_nombre}\n`;
                                mensaje += `📅 **Fecha:** ${new Date(row.fecha_ganado).toLocaleDateString()}\n\n`;
                            }
                        }
                        
                        // Enviar el mensaje al canal donde se ejecutó el comando
                        interaction.channel.send(mensaje);
                    }
                );
            } else {
                return interaction.followUp ({
                    content: 'El canal no es el correcto',
                    ephemeral: true
                })
            }
        }
        
    });
};
