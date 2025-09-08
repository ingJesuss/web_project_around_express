const User = require('../models/Users');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json('Error al obtener los usuarios');
    });
};

// usuario por id
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error('Error al obtener el usuario por ID:', err);
      res.status(500).json({ msg: 'Error al obtener el usuario por ID' });
    });
};
// crear nuevo usuario

const createUser = (req, res) => {
  // los datos los traemos del cuerpo y accedemos a traves de req.body
  const { name, about, avatar } = req.body;

  // usamos metodo create en el modelo User y pasamos un obj con los datos del nuevo usuario

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ msg: 'Error interno del servidor' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
