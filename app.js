// Paso 1: Importar Express
const express = require('express');

// Paso 2: Crear una instancia de la aplicación
const app = express();

// Paso 3: Definir el puerto de escucha
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.get('/', (req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Paso 4: Poner el servidor a "escuchar"
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}...`);
});
