const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);

// Otras rutas (actualizar, eliminar, etc.) se pueden agregar aquí

module.exports = router;
