import filesService from '../services/files.service.js'
import { generateResError } from '../libs/errors.js'
const config = (await import(`../config.js`)).default(process.env.NODE_ENV)

/**
 * Контроллер для работы с файлами
 */
class FileController {
    /**
     * Загрузка файла на сервак
     * @param {*} req - request
     * @param {*} res - response
     * @returns - url с путём к файлу
     */
    async uploadFile(req, res) {
        try {
            const file = req.files.file
            let result = await filesService.upload(file)
            return res.json(result)
        } catch (e) {
            return generateResError(res, error);
        }
    }
    //TODO реализовать просмоотр всех загруженных файлов, можно утащить соответствие имён из базы
}

export default new FileController()