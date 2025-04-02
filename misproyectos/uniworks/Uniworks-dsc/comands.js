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
            name: 'ranking',
            description: 'Muestra el Ranking de puntos.'
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

        // RETOS
        
        guild.commands.create({
            name: 'crear_reto',
            description: 'Crea un reto semanal',
            options: [
                {
                    name: 'nombre',
                    type: 3, // STRING
                    description: 'Nombre del reto',
                    required: true,
                },
                {
                    name: 'recompensa',
                    type: 4, // INTEGER
                    description: 'Recompensa por el reto',
                    required: true,
                },
                {
                    name: 'fecha_inicio',
                    type: 3, // STRING
                    description: 'Fecha de inicio (YYYY-MM-DD)',
                    required: true,
                },
                {
                    name: 'fecha_fin',
                    type: 3, // STRING
                    description: 'Fecha de fin (YYYY-MM-DD)',
                    required: true,
                },
                {
                    name: 'descripcion',
                    type: 3, // STRING
                    description: 'Descripción del reto',
                    required: false,
                },
            ],
        });
        guild.commands.create({
            name: 'listar_ganadores',
            description: 'Muestra una lista de los ganadores de los retos',
            options: [
                {
                    name: 'reto_id',
                    type: 4, // INTEGER
                    description: 'ID del reto',
                    required: true,
                },
            ],
        });
        guild.commands.create({
            name: 'asignar_ganador',
            description: 'Asigna un ganador a un evento o reto específico',
            options: [
                {
                    name: 'usuario',
                    type: 6, // @USER
                    description: 'ID del usuario ganador',
                    required: true,
                },
                {
                    name: 'reto_id',
                    type: 4, // INTEGER
                    description: 'ID del reto',
                    required: true,
                },
            ],
        });
        
        console.log('Comandos registrados.');
    });
}
