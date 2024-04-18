import { Router } from "express";
import NewsRoutes from './api/news.routes.js'
import AuthRoutes from './api/auth.routes.js'

const router = Router()

router.use('/news', NewsRoutes)
router.use('/auth', AuthRoutes)

export default router