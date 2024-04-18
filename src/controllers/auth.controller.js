import { generateResError } from "../libs/errors.js"
import usersService from "../services/users.service.js"

/**
 * Контроллер для работы с авторизацией и регистрацией
 */
class AuthController {
    /** Регистрация пользователя */
    async registerUser(req, res) {
        try {  
            return res.json(await usersService.registerUser(req.body))
        }
        catch (error) {
            return generateResError(res, error);
        }
    }
    /** Авторизация пользователя */
    async login(req, res) {
        try {  
            return res.json(await usersService.login(req.body))
        }
        catch (error) {
            return generateResError(res, error);
        }
    }
}

export default new AuthController();