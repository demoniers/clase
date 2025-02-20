const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

// Registro de usuario
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'El correo electrónico ya existe' });
    } else {
      const newUser = new User({ username, email, password });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Inicio de sesión de usuario
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: 'Usuario no encontrado' });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };

        jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        return res.status(400).json({ password: 'Contraseña incorrecta' });
      }
    });
  });
});

module.exports = router;
