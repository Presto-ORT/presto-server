require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const usersController = require('../controllers/usersController');


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function (req, res, next) {
  try {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.toLowerCase().trim();
    password = password.trim();

    // console.log(name, email, password);

    let user = await usersController.getUserByEmail(email);
    if (user) return res.status(400).json({ error: "Error", description: "El usuario ya existe, por favor ingrese otro email" });

    password = await bcrypt.hash(password, 10);
    console.log(password);

    let saved = await usersController.addNewUser({ name, email, password });
    if (!saved.insertedId) return res.status(500).json({ error: 'Error' });

    const token = jwt.sign({ _id: saved.insertedId }, process.env.SECRET, {});

    res.status(201).json({ _id: saved.insertedId, name, email, accessToken: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
  }
});

router.post('/login', async function (req, res, next) {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();
    password = password.trim();

    let user = await usersController.getUserByEmail(email);
    if (!user) return res.status(404).json({ error: "Error", description: "Usuario o contraseña incorrecto" });

    let match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(404).json({ error: "Error", description: "Usuario o contraseña incorrecto" });

    delete user.password

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {});
    user.accessToken = token;

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
  }
});

router.post('/login/google', async function (req, res, next) {
  try {
    let { accessToken } = req.body;

    let response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)

    let googleUser = response.data;

    let user = await usersController.getUserByGoogleId(googleUser.id);

    if (!user) {
      let saved = await usersController.addNewUser({ name: googleUser.name, email: googleUser.email, googleId: googleUser.id });
      if (!saved.insertedId) return res.status(500).json({ error: 'Error' });
      const token = jwt.sign({ _id: saved.insertedId }, process.env.SECRET, {});
      return res.status(201).json({ _id: saved.insertedId, name: googleUser.name, email: googleUser.email, accessToken: token });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {});
    user.accessToken = token;

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
  }
});

module.exports = router;
