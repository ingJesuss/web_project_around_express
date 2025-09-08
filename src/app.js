const express = require('express');
const connectDb = require('./config/database');
const usersRoutes = require('./routes/users.routes');
const cardsRoutes = require('./routes/cards.routes');

const app = express();
connectDb();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '68bb43e817a82803282973a6',
  };
  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.get('/', (req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}...`);
});
