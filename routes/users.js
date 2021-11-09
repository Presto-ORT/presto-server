const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  // recibimos nombre, mail y contraseña
  // validamos que la contraseña no exista
  // si no existe, creamos el usuario y creamos token
  // si existe, respondemos error
  res.status(201).json({});
});

router.get('/login', function (req, res, next) {
  // recibimos mail y contraseña
  // validamos contraseña
  // si esta todo ok, generamos token
  // sino, respondemos error
  res.json({});
});

module.exports = router;
