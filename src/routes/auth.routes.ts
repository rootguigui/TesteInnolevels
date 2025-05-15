import { Router } from "express";
import { history, login, register, verify } from "../controllers/auth.controller";
import { createUserSchema } from "../schemas/create-user.schema";
import { validateRequest } from "../middlewares/validate-request";
import { loginSchema } from "../schemas/auth-login.schema";
import { authHistorySchema } from "../schemas/auth-history.schema";
import { authVerifySchema } from "../schemas/auth-verify.schema";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    Register:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        name:
 *          type: string  
 *    Verify:
 *      type: object
 *      properties:
 *        auth:
 *          type: string
 *    History:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login de usuário
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: Login realizado com sucesso
 *      401:
 *        description: Credenciais inválidas
 */
router.post("/login", validateRequest(loginSchema), login);

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Registro de usuário
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Register'
 *    responses:
 *      200:
 *        description: Registro realizado com sucesso
 *      400:
 *        description: Email já cadastrado
 */
router.post("/register", validateRequest(createUserSchema), register);

/**
 * @swagger
 * /auth/history/{email}:
 *  get:
 *    summary: Histórico de login
 *    tags: [Auth]
 *    parameters:
 *      - in: path
 *        name: email
 *        required: true
 *        schema:
 *          type: string
 *        description: Email do usuário
 *    responses:
 *      200:
 *        description: Histórico de login
 *      401:
 *        description: Não autorizado
 */
router.get("/history/:email", validateRequest(authHistorySchema), history);

/**
 * @swagger
 * /auth/verify:
 *  post:
 *    summary: Verificação de usuário
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Verify'
 *    responses:  
 *      200:
 *        description: Verificação de usuário
 *      401:
 *        description: Não autorizado
 */
router.post("/verify", validateRequest(authVerifySchema), verify);

export default router;
