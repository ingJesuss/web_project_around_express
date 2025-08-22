const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

// Creamos la ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

  fs.readFile(usersFilePath, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error al leer el archivo de usuarios',
        error: err.message,
      });
    });
});

// Nueva ruta para obtener usuario por ID
router.get('/:id', (req, res) => {
  // Obtenemos el ID de los parámetros de la ruta
  const { id } = req.params;

  // Definimos la ruta al archivo de usuarios
  const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

  fs.readFile(usersFilePath, { encoding: 'utf8' })
    .then((data) => {
      // Convertimos el JSON a un array de usuarios
      const users = JSON.parse(data);

      // Buscamos el usuario con el ID especificado
      const user = users.find((currentUser) => currentUser._id === id);

      // Si no encontramos el usuario, enviamos un error 404
      if (!user) {
        return res.status(404).json({ message: 'ID de usuario no encontrado' });
      }

      // Si encontramos el usuario, lo enviamos
      return res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error al leer el archivo de usuarios',
        error: err.message,
      });
    });
});

module.exports = router;
