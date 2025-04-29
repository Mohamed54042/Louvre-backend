const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Inscription
router.post('/register', userController.register);

// Connexion
router.post('/login', userController.login);

module.exports = router;