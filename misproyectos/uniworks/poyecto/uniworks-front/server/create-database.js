const mongoose = require('mongoose');

// Conexión a la base de datos
const db = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/myapp?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    createCollections();
  })
  .catch(err => console.log(err));

const createCollections = async () => {
  try {
    // Definir el esquema de usuario
    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    });

    // Crear modelo de usuario
    const User = mongoose.model('User', userSchema);

    // Definir otros esquemas y modelos según sea necesario
    // Por ejemplo, un esquema para mensajes en el sistema de chat
    const messageSchema = new mongoose.Schema({
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    });

    // Crear modelo de mensaje
    const Message = mongoose.model('Message', messageSchema);

    // Si necesitas más colecciones, añádelas aquí de manera similar

    console.log('Colecciones y esquemas creados exitosamente.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creando colecciones y esquemas:', error);
    mongoose.connection.close();
  }
};
