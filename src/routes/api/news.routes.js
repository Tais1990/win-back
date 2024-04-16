import { Router } from "express";
import newsController from "../../controllers/news.controller.js";

const router = Router()

router.get('/', newsController.getAll)
// router.get('/:page', blocksController.getAll)
// router.get('/:page/:code', blocksController.getBlock)
// router.put('/:id', blocksController.put)

export default router;