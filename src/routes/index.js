import { Router } from "express";
import NewsRoutes from './api/news.routes.js'

const router = Router()

router.use('/news', NewsRoutes)

export default router