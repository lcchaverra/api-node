const {connection, mondb } = require('../connection')
const User = require("../models/users/userModel");
const userService = require("../../services/users/userService");

// ---------------------------------------------- Users con SQL
const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUser()
        res.status(200).json(users)
    } catch (err){
        res.status(400).json({error: `Ha ocurrido un error en el servidor: ${err}`})
    }
}
const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id)
        if (!user) return res.status(404).send({error: `El usuario con id ${req.params.id} no existe`})
        res.status(200).json(user)
    } catch (err){
        res.status(400).json({error: `Ha ocurrido un error al obtener el usuario: ${err}`})
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body)
        res.status(201).json({ message: 'Usuario creado exitosamente', data: newUser });
    }
    catch (err){
        res.status(400).json({error: `Ha ocurrido un error al crear el usuario: ${err}`})
    }
}


const updateUser = async(req, res) => {
    try {
        const updateUser = await userService.updateUser(req.params.id, req.body)
        res.status(200).json({ message: 'Usuario actualizado exitosamente', data: updateUser });
    }
    catch (err){
        res.status(400).json({error: `Ha ocurrido un error al actualizar el usuario: ${err}`})
    }
}

const deleteUser = async(req, res) => {
    try {
        await userService.deleteUser(req.params.id)
        res.status(202).json({ message: 'Usuario eliminado exitosamente' });
    }
    catch (err){
        res.status(400).json({error: `Ha ocurrido un error al eliminar el usuario: ${err}`})
    }
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