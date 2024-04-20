import { Router } from "express";
import fileController from '../../controllers/files.controller.js'
import { authJwt } from '../../middlewares/index.js'  

const router = Router()


router.post('/upload', [authJwt.verifyToken], fileController.uploadFile)


export default router;