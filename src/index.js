const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config()
const users = require("./routes/users/userRoutes");
const port = process.env.PORT || 3000;
const cors = require('cors')

//middlweares generales
app.use(cors());
app.use(express.json());

// Middleware para Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Rutas principales
app.use('/api/users',users)

//Ruta base
app.get('/', (req, res) =>  {
    res.send(`Api version 0.1 - ${new Date().toDateString()}`);
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
})