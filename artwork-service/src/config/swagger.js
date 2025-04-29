const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Artwork Service API',
      version: '1.0.0',
      description: 'API pour gérer les œuvres du musée du Louvre',
    },
    servers: [
      {
        url: 'http://localhost:3002',
      },
    ],
    components: {
      schemas: {
        Artwork: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            title: {
              type: 'string',
              example: 'Mona Lisa',
            },
            artist: {
              type: 'string',
              example: 'Léonard de Vinci',
            },
            year: {
              type: 'integer',
              example: 1503,
            },
            description: {
              type: 'string',
              example: 'Portrait célèbre exposé au Louvre.',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Fichiers à scanner pour les annotations Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
