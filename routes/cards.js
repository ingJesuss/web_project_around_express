const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

// Creamos la ruta para obtener todas las tarjetas
router.get('/', (req, res) => {
  const cardFilePah = path.join(__dirname, '..', 'data', 'cards.json');

  fs.readFile(cardFilePah, { encoding: 'utf8' })
    .then((data) => {
      const cards = JSON.parse(data);
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error al leer el archivo cards',
        error: err.message,
      });
    });
});

module.exports = router;
