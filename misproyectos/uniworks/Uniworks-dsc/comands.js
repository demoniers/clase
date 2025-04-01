module.exports = async (client) => {
    // Registrar comandos del bot
    client.on('ready', () => {
        const guildId = '1353102826582179972';
        const guild = client.guilds.cache.get(guildId);
    
        if (!guild) {
            console.error('No se encontró el servidor especificado.');
            return;
        }
    
        guild.commands.create({
            name: 'puntos',
            description: 'Muestra cuántos puntos tienes.'
        });
        guild.commands.create({
            name: 'comprobar_usuarios',
            description: 'Buscara todos los usuarios del servidor y comprobara si aun estan en el.'
        });
        guild.commands.create({
            name: 'log-view',
            description: 'Comando para ver los log de los bonos'
        });
        guild.commands.create({
            name: 'bonusadd',
            description: 'Añade un bono de puntos al usuario.',
            options: [
                {
                    type: 6,
                    name: 'usuario',
                    description: 'Usuario al que se otorgará el bono.',
                    required: true
                },
                {
                    type: 3,
                    name: 'descripcion',
                    description: 'Descripción del bono (opcional).',
                    required: false
                }
            ]
        });
        guild.commands.create({
            name: 'drop',
            description: 'Registra una acción con una descripción y un número de puntos.',
            options: [
                {
                    type: 3, // STRING
                    name: 'descripcion',
                    description: 'Descripción de la acción.',
                    required: true
                },
                {
                    type: 4, // INTEGER
                    name: 'puntos',
                    description: 'Número de puntos asociados.',
                    required: true
                }
            ]
        });
    
        console.log('Comandos registrados.');
    });
}
