import newsService from "../services/news.service.js"
import { generateResError } from "../libs/errors.js"
import { getCurrentUser } from "../libs/jwt.js";

/**
 * Контроллекр новостей
 */
class NewsController {
    /**
     * Запрос на полуение всех новостей
     * @param {*} req - request
     * @param {*} res - response
     * @returns - массив новостей
     */
    async getAll(req, res) {
        try {         
            let result = await newsService.getAll()
            return res.json(result)
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
    /**
     * Запрос на получение как-нибудь спецефических новостей, только для авторизованных пользователей
     * @param {*} req - request
     * @param {*} res - response
     * @returns - массив новостей
     */
    async getMy(req, res) {
        try {         
            let result = await newsService.getMy()
            return res.json(result)
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
    /**
     * Создание новости
     * @param {*} req - request
     * @param {*} res - response
     * @returns - созданная новость
     */
    async create(req, res) {
        try { 
            return res.json(await newsService.create(req.body, getCurrentUser(req)))
        }
        catch (error) {
            return generateResError(res, error);
        }
    }
    /**
     * Редактирование новости
     * @param {*} req - request
     * @param {*} res - response
     * @returns - отредактированная новость
     */
    async update(req, res) {
        try { 
            return res.json(await newsService.update(req.body, getCurrentUser(req)))
        }
        catch (error) {
            return generateResError(res, error);
        }
    }
    /**
     * Удаление новости
     * @param {*} req - request
     * @param {*} res - response
     * @returns - новость, которую удалили
     */
    async delete(req, res) {
        try {
            let result = await newsService.delete(req.params.id, getCurrentUser(req))
            return res.json(result)
        }
        catch (error) {
            return generateResError(res, error);
        }
    }
    /**
     * Публикация новости
     * @param {*} req - request
     * @param {*} res - response
     * @returns - новость, которую опубликовали
     */
    async publish(req, res) {
        try {
            let result = await newsService.publish(req.params.id, getCurrentUser(req))
            return res.json(result)
        }
        catch (error) {
            return generateResError(res, error);
        }
    }
    /**
     * Публикация новостей - всех, которые надо опубликовать
     * @param {*} req - request
     * @param {*} res - response
     * @returns - результат
     */
    async publishAll(req, res) {
        try {
            let result = await newsService.publishAll()
            return res.json(result)
        }
        catch (error) {
            return generateResError(res, error);
        }
    }
}

export default new NewsController();