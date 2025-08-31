import { Router } from "express";
import { RolController } from "../controllers/rol.controller";
import { authenticate } from "../../../api/middlewares/auth.middleware";

const router = Router();
const rolController = new RolController();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 */
router.get('/', rolController.getAllRoles);
 
/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 */
router.get('/:id', rolController.getRoleById);
 

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol creado
 */
router.post('/', rolController.createRole);
 
/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol actualizado
 *       404:
 *         description: Rol no encontrado
 */
router.put('/:id', rolController.updateRole);
 
/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Rol eliminado
 *       404:
 *         description: Rol no encontrado
 */
router.delete('/:id', rolController.deleteRole);
 
export default router;
