const express = require('express');
const connectDb = require('./config/database');
const usersRoutes = require('./routes/users.routes');

const app = express();
connectDb();

app.use(express.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}...`);
});
