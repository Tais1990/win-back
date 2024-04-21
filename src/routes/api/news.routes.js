import { Router } from "express";
import newsController from "../../controllers/news.controller.js";
import { authJwt } from '../../middlewares/index.js'

const router = Router()

router.get('/', newsController.getAll)
router.get('/my', [authJwt.verifyToken], newsController.getMy)
router.post('/', [authJwt.verifyToken], newsController.create)
router.put('/', [authJwt.verifyToken], newsController.update)
router.delete('/:id', [authJwt.verifyToken], newsController.delete)
router.put('/:id/publish', [authJwt.verifyToken], newsController.publish)

export default router;