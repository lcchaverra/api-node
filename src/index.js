const express = require("express");
const app = express();
require('dotenv').config()
const users = require("./routes/users/userRoutes");
const port = process.env.PORT || 3000;
const cors = require('cors')

//middlweares geenrales
app.use(cors);
app.use(express.json());

//Rutas principales
app.use('/users',users)

//Ruta base
app.get('/', (req, res) =>  {
    res.send(`Api version 0.1 - ${new Date().toDateString()}`);
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})