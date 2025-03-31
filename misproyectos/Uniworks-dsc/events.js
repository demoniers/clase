module.exports = (client, db) => {
    client.on('messageCreate', (message) => {
        if (message.author.bot) {
            return; // Ignorar mensajes de bots
        }

        const userId = message.author.id;

        db.get('SELECT points FROM puntos WHERE user_id = ?', [userId], (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }

            if (row) {
                // Si el usuario ya tiene puntos, actualizarlos
                const newPoints = row.points + 1;
                db.run('UPDATE puntos SET points = ? WHERE user_id = ?', [newPoints, userId], (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
            } else {
                // Si es un usuario nuevo, agregarlo
                db.run('INSERT INTO puntos (user_id, points) VALUES (?, ?)', [userId, 1], (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
            }
        });
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
                    interaction.reply(`${user.username}, tienes ${row.points} puntos.`);
                } else {
                    interaction.reply(`${user.username}, todavía no tienes puntos.`);
                }
            });
        }
    });
};
