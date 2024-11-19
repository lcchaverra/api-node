const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/userControllerMongo");

router.get('/allmongo', usersController.getAllUserMongo)

router.get('/getusermongo', usersController.getUserMongo)

router.post('/createmongo', usersController.createUserMongo)

router.put('/updatemongo/:id', usersController.updateUserMongo)

router.delete('/deletemongo/:id', usersController.deleteUserMongo)


module.exports = router