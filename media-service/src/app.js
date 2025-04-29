require('dotenv').config(); // Charger les variables d'environnement en haut

const express = require('express');
const app = express();
const sequelize = require('./config/database');
const mediaRoutes = require('./routes/media.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger');

const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/media', mediaRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware gestion globale des erreurs
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Erreur serveur' });
}

// Ajout du middleware à Express
app.use(errorHandler);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connexion DB réussie');

    // Attention, force: true supprime et recrée les tables à chaque démarrage
    await sequelize.sync({ force: false });
    console.log('Synchronisation DB réussie');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage :', error);
  }
}

startServer();
