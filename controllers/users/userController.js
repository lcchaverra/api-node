const userService = require("../../services/users/userService");
const {generateToken} = require('../../utils/jwt');
const bcrypt = require('bcryptjs');
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

const logUser = async(req, res) => {
    try {
        const user = await userService.loguinUser(req.body.username)
        const password = req.body.password;
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).send({error: `La contraseña es incorrecta`});
            const token = generateToken(user);
            res.status(200).json({ token: token, message: 'Usuario logueado exitosamente' });
        }
        else {
            return res.status(404).send({error: `El usuario no existe`})
        }
    }
    catch (err){
        res.status(400).json({error: `Ha ocurrido un error al buscar el usuario: ${err}`})
    }
}

module.exports = {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    logUser
};