const router = require('express').Router();

// importar funciones del controlador

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.controller');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/profile', updateProfile);
router.patch('/avatar', updateAvatar);

module.exports = router;
