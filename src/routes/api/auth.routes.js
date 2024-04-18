import { Router } from "express";
import authController from "../../controllers/auth.controller.js";
import verifySignUp from "../../middlewares/verifySignUp.js";

const router = Router()

router.post('/register', [verifySignUp.checkDuplicateEmail], authController.registerUser)
router.post('/login', authController.login)

export default router;