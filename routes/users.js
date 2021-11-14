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
    if (!saved.insertedId) return res.status(500).json({ error: 'Error' });

    // TODO: Agregar JWT y enviarlo en la response

    res.status(201).send('Registro creado');
  } catch (error) {
    res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
  }
});

router.post('/login', async function (req, res, next) {
  let { email, password } = req.body;

  let user = await usersController.getUserByEmail(email);
  if (!user) return res.status(404).json({ error: "Error", description: "Usuario o contraseña incorrecto" });

  let match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(404).json({ error: "Error", description: "Usuario o contraseña incorrecto" });

  // TODO: Agregar JWT y enviarlo en la response
  delete user.password

  res.json(user);
});

module.exports = router;
