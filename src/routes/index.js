import { Router } from "express";
import NewsRoutes from './api/news.routes.js'
import AuthRoutes from './api/auth.routes.js'
import FilesRoutes from './api/files.routes.js'

const router = Router()

router.use('/news', NewsRoutes)
router.use('/auth', AuthRoutes)
router.use('/files', FilesRoutes)

export default router