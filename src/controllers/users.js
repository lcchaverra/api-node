const {connection, mondb } = require('../connection')
const User = require("../models/users")

// ---------------------------------------------- Users con SQL
const getAllUser = (req, res) => {
    const sql = 'select * from users'
    connection.query(sql, (err, result)=>{
        if (err){
            res.status(400).send({error: `Ha ocurrido un error en el servidor: ${err}`})
        }
        else {
            res.status(200).send(result)
        }
    })
}
const getUser = (req, res) => {
    const sql = 'select * from users where id = ?'
    const id = req.params.id
    connection.query(sql, id, (err, result)=>{
        if (err){
            res.status(404).send({error: `Ha ocurrido un error en el servidor: ${err}`})
        }
        else {
            res.status(200).send(result)
        }
    })
}

const createUser = (req, res) => {
    const randomId = Math.floor(Math.random() * 1000)
    let date = new Date();
    const data = req.body
    const sql = `insert into users values(${randomId},'${data.username}', '${data.email}', '${data.password}',' ${date.toLocaleDateString} ');`
    connection.query(sql, (err, result) => {
        if (err){
            res.status(400).send({error: `Ha ocurrido un error en el servidor: ${err}`})
        }
        else {
            res.status(201).send({message: 'Usuario creado exitosamente: ', result: result});
        }
    })
}

const updateUser = (req, res) => {
    const id = req.params.id
    const newData = req.body
    const sql = `UPDATE users SET ? WHERE id = ?`
    connection.query(sql, [newData, id], (err, result) => {
        if (err){
            res.status(304).send({error: `Ha ocurrido un error en el servidor: ${err}`})
        }
        else {
            res.status(200).send({message: 'Usuario actualizado exitosamente: ', result: result});
        }
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    const sql = `Delete from users WHERE id = ?`
    connection.query(sql, id, (err, result) => {
        if (err){
            res.status(400).send({error: `Ha ocurrido un error en el servidor: ${err}`})
        }
        else {
            res.status(202).send({message: 'Usuario eliminado exitosamente: ', result: result});
        }
    })
}

// ----------------------------------------------------Users con MongoDB
const getAllUserMongo = async (req, res) => {
    let result = await User.find({})

    if (result) {
        res.status(200).send({message: 'Listado de Usuarios:', data: result})
    }
    else {
        res.status(400).send({ message: 'Ha ocurrido un error al consultar los usuarios:', data: result})
    }
}

const getUserMongo = async (req, res) => {
    const userID = req.params.id
    let result = await User.find({_id: userID})
    if (result) {
        res.status(200).send({message: 'Listado de Usuarios:', data: result})
    }
    else {
        res.status(404).send({ message: 'Ha ocurrido un error al consultar los usuarios:', data: result})
    }
}

const createUserMongo = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "No se puede crear datos vacios!"
        });
    }
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    const result = await newUser.save()
    if (result) {
        res.status(201).send({message: 'Usuario creado correctamente:', data: result})
    }
    else {
        res.status(400).send({ message: 'Ha ocurrido un error al crear el usuario:', data: result})
    }

}

const updateUserMongo = async (req, res) => {
    const query = { _id: (req.params.id) }
    let result = await User.updateOne(query, req.body)
    
    if (result) {
        res.status(200).send({message: 'Usuario actualizado exitosamente: ', result: result});
    }
    else {
        res.status(304).send({error: `Ha ocurrido un error en el servidor: ${err}`})
    }
    
}

const deleteUserMongo = async (req, res) => {
    const query = { _id: (req.params.id) }
    let result = await User.deleteOne(query)
    
    if (result) {
        res.status(202).send({message: 'Usuario eliminado exitosamente: ', result: result});
    }
    else {
        res.status(400).send({error: `Ha ocurrido un error en el servidor: ${err}`})
    }
}


module.exports = {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserMongo,
    getAllUserMongo,
    createUserMongo,
    updateUserMongo,
    deleteUserMongo
};