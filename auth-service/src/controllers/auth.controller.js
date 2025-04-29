const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const SECRET_KEY = 'louvre_secret_key'; // à mettre dans .env normalement

module.exports = {
  // Register
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ username, email, password: hashedPassword });

      res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  },

  // Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Mot de passe incorrect' });

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  },

  // Profile
async profile(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'createdAt'] // tu peux ajuster les champs
    });

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
}

}
