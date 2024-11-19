const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST Express',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
