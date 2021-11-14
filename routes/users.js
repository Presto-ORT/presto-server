const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const usersController = require('../controllers/usersController');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function (req, res, next) {
  try {
    let { name, email, password } = req.body;
    email = email.toLoweCase();

    let user = await usersController.getUserByEmail(email);
    if (user) return res.status(400).json({ error: "Error", description: "El usuario ya existe, por favor ingrese otro email" });

    password = await bcrypt.hash(password, 10);
    console.log(password);

    let saved = await usersController.addNewUser({ name, email, password });
    if (!saved.insertedId) return res.status(500).json({ error: 'Error' })

    res.status(201).send('Registro creado');
  } catch (error) {
    res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
  }
});

router.get('/login', function (req, res, next) {
  // recibimos mail y contraseña
  // validamos contraseña
  // si esta todo ok, generamos token
  // sino, respondemos error
  res.json({});
});

module.exports = router;
