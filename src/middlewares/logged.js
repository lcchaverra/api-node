const isLogged = (req, res, next) => {
    let logged = true;
    (logged) ? next() : res.send("no está logueado, por lo tanto no tiene acceso")
} 

module.exports = isLogged