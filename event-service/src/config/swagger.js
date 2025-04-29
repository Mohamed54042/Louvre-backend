const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Louvre Museum API',
      version: '1.0.0',
      description: 'API pour gérer les œuvres, événements et plus du musée du Louvre',
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
        Event: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            title: {
              type: 'string',
              example: 'Bataille de Hastings',
            },
            description: {
              type: 'string',
              example: 'Bataille décisive de 1066 en Angleterre',
            },
            date: {
              type: 'string',
              format: 'date',
              example: '1066-10-14',
            },
            location: {
              type: 'string',
              example: 'Hastings, Angleterre',
            },
            civilization: {
              type: 'string',
              example: 'Normands',
            },
            theme: {
              type: 'string',
              example: 'Guerre',
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
  apis: ['./src/routes/*.js'], // chemin vers tes fichiers routes pour lire les annotations swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
