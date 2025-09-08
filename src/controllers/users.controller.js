const User = require('../models/User');

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

// actualizar perfil
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Usuario no encontrado'))
    .then((user) => {
      res.statuis(200).json(user);
    })
    .catch((err) => {
      if (err.message === 'Usuario no encontrado') {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Datos de usuario inválidos' });
      }
      res.status(500).send({ message: 'Error en el servidor' });
    });
};

// actualizar avatar

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Usuario no encontrado'))
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.message === 'Usuario no encontrado') {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'URL de avatar inválida' });
      }
      res.status(500).send({ message: 'Error en el servidor' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
