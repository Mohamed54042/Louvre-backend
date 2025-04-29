require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Utiliser authRoutes pour les routes liées à l'authentification
app.use('/api/auth', authRoutes);

// Utiliser userRoutes pour les routes utilisateurs
app.use('/api/users', userRoutes);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
});

const sequelize = require('./config/database');

sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch((error) => console.error('Unable to sync database:', error));
