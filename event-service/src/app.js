const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const eventRoutes = require('./routes/event.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// ✅ Middlewares d'abord !
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // pour parser le body JSON

// ✅ Routes après
app.use('/api/events', eventRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Port
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Event Service running on port ${PORT}`);
});

// DB Sync
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('DB sync error:', err));
