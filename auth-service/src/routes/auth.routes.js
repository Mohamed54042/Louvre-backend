const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Inscription
router.post('/register', AuthController.register);

// Connexion
router.post('/login', AuthController.login);

// Profil avec le middleware d'authentification
router.get('/profile', authMiddleware, AuthController.profile);

module.exports = router;
