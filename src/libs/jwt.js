import jwt from "jsonwebtoken";
import { UnauthorizedError } from "./errors.js";
const config = (await import(`../config.js`)).default(process.env.NODE_ENV)

/**
 * Вычисление текщуго атворизованного польщователя по запросу
 * @param {*} req - request
 * @returns идентификатор пользователя в базе
 */
export const getCurrentUser = (req) => {
    try {
        let token = req.headers["x-access-token"];
        if (!token) {
            throw new UnauthorizedError('Unauthorized!')
        }
        const decoded = jwt.verify(token, config.auth.secret);  
        var userId = decoded.id 
        if (!userId) {
            throw new UnauthorizedError('Unauthorized!')
        }
        return userId
    } catch(error) {
        throw error;
    }    
}