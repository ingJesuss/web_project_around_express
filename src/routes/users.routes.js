const router = require('express').Router();

// importar funciones del controlador

const { getUsers, getUserById, createUser } = require('../controllers/users.controller');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);

module.exports = router;
