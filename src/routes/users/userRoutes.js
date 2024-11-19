const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/logged")
const usersController = require("../../controllers/users/userController");

// Rutas para los usuarios
/**
 * @swagger
 * tags:
 *   name: users
 *   description: Endpoints para gestionar usuarios
 */

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario
 *                   email:
 *                     type: string
 *                     description: email del usuario
 *                   password:
 *                     type: string
 *                     description: contraseña del usuario
 *                   category:
 *                     type: string
 *                     description: Categoría del usuario
 *                   rol:
 *                     type: string
 *                     description: Rol del usuario
 *                   createdAt:
 *                     type: string
 *                     format: date
 *                     description: Fecha de creación del usuario
 *                   updatedAt:
 *                     type: string
 *                     format: date
 *                     description: Fecha de actualización del usuario
 */
router.get('/', usersController.getAllUser)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                 name:
 *                   type: string
 *                   description: Nombre de usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', usersController.getUser)

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 description: email del usuario
 *               password:
 *                 type: string
 *                 description: contraseña del usuario
 *               categoria:
 *                 type: string
 *                 description: Categoría del usuario
 *               rol:
 *                 type: string
 *                 description: Rol del usuario
 *               createdAt:
 *                 type: string
 *                 format: date
 *                 description: Fecha de creación del usuario
 *               updatedAt:
 *                 type: string
 *                 format: date
 *                 description: Fecha de actualización del usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error al crear el usuario
 */
router.post('/', usersController.createUser)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 description: email del usuario
 *               password:
 *                 type: string
 *                 description: contraseña del usuario
 *               categoria:
 *                 type: string
 *                 description: Categoría del usuario
 *               rol:
 *                 type: string
 *                 description: Rol del usuario
 *               createdAt:
 *                 type: string
 *                 format: date
 *                 description: Fecha de creación del usuario
 *               updatedAt:
 *                 type: string
 *                 format: date
 *                 description: Fecha de actualización del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error al actualizar el usuario
 */
router.put('/:id', usersController.updateUser)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       202:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error al eliminar el usuario
 */
router.delete('/:id', usersController.deleteUser)

//ejemplo de ruta protegida
// router.get('/all', authMiddleware, usersController.getAllUser)

module.exports = router