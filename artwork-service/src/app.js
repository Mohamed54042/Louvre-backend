require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express(); // ← Déclarer d'abord `app`

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Swagger docs — maintenant que `app` existe, c'est bon 👍
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const artworkRoutes = require('./routes/artwork.routes');
app.use('/api/artworks', artworkRoutes);

// DB
const sequelize = require('./config/database');

// Lancement serveur
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Artwork Service running on port ${PORT}`);
});

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('DB sync error:', err));
