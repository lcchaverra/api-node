const { mondb } = require('../../connection')
const User = require("../../models/users/userModel");

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
        res.status(200).send({message: 'Datos del Usuario:', data: result})
    }
    else {
        res.status(404).send({ message: 'Ha ocurrido un error al consultar el usuarios:', data: result})
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
        res.status(304).send({error: `Ha ocurrido un error, no se ha podido actualizar el usuario: ${err}`})
    }
    
}

const deleteUserMongo = async (req, res) => {
    const query = { _id: (req.params.id) }
    let result = await User.deleteOne(query)
    
    if (result) {
        res.status(202).send({message: 'Usuario eliminado exitosamente: ', result: result});
    }
    else {
        res.status(400).send({error: `Ha ocurrido un error, no se ha podido eliminar el usuario: ${err}`})
    }
}


module.exports = {
    getUserMongo,
    getAllUserMongo,
    createUserMongo,
    updateUserMongo,
    deleteUserMongo
};