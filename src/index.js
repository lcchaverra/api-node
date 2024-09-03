const express = require("express");
// const path = require("path");
const app = express();
require('dotenv').config()
const users = require("./routes/users");
const loginMiddleware = require("./middlewares/logged");
const port = process.env.PORT || 3000;

// app.use(loginMiddleware)
// app.use (express.static(path.join(__dirname, '/public')))

// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))

console.log(app.locals.settings)

app.use(express.json())

app.get('/', (req, res) =>  {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateFormated = `${day}.${month}.${year}`
    res.send(`Api version 0.1 - ${dateFormated}`);
})

app.use('/users',users)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})