import filesService from '../services/files.service.js'
import { NotFoundError, generateResError } from '../libs/errors.js'
const config = (await import(`../config.js`)).default(process.env.NODE_ENV)

/**
 * Контроллер для работы с файлами
 */
class FileController {
    /**
     * Загрузка файлов на сервак
     * @param {*} req - request
     * @param {*} res - response
     * @returns - масисв url с путём к файлу
     */
    async uploadFile(req, res) {
        try {
            if (!req.files) {
                throw new NotFoundError('Files not found!')
            }
            let result = await filesService.uploadMany(req.files.files.length ? req.files.files : [req.files.files])
            return res.json(result)
        } catch (error) {
            return generateResError(res, error);
        }
    }
    //TODO реализовать просмоотр всех загруженных файлов, можно утащить соответствие имён из базы
}

export default new FileController()