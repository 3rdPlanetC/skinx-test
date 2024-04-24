import { Router } from "express"
import { AuthController } from "../controllers/AuthController"
import { AuthMiddleware } from "../middlewares/AuthMiddleware"

const router = Router()

router.post("/login", AuthController.login)
// router.post("/logout", AuthController.logout)
router.post("/refresh", AuthMiddleware.refreshTokenMiddleware, AuthController.refresh)
router.post('/register', AuthController.register)

export default router