const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get('/all', usersController.getAllUser)

router.get('/getuser', usersController.getUser)

router.post('/create', usersController.createUser)

router.put('/update/:id', usersController.updateUser)

router.delete('/delete/:id', usersController.deleteUser)

router.get('/allmongo', usersController.getAllUserMongo)

router.get('/getusermongo', usersController.getUserMongo)

router.post('/createmongo', usersController.createUserMongo)

router.put('/updatemongo/:id', usersController.updateUserMongo)

router.delete('/deletemongo/:id', usersController.deleteUserMongo)

module.exports = router