import Users from "../models/users.js";
const config = (await import(`../config.js`)).default(process.env.NODE_ENV)

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { NotFoundError, UnauthorizedError } from "../libs/errors.js";

/**
 * Сервис для Юзеров
 */
class UsersService {
    /** Все юзеры */
    async getAll() {
        return await Users.find({});
    }
    /**
     * Регистрация ползователя
     * @param {*} form - {name, email, password} - {имя, email, пароль}
     * @returns созданный юзер, если всё хорошо; ошибка, если что-то пошло не так
     */
    async registerUser(form) {
        try {
            const user = await Users.create({
                ...form,
                password: bcrypt.hashSync(form.password, 8)
            })
            return user;
        } catch (error) {
            // проверить, как отрабатывают ошибки
            throw error;
        }
    }
    /**
     * Авторизация пользователя
     * @param {*} form - {email, password} - {email, пароль}
     * @returns юзер с токеном, если всё хорошо; ошибка, если что-то пошло не так
     */
    async login(form) {
        try {
            const user = await Users.findOne({ email: form.email});
            if (!user) {
                throw new NotFoundError("User Not found.")
            } 
            var passwordIsValid = bcrypt.compareSync(
                form.password,
                user.password
            );
            if (!passwordIsValid) {
                throw new UnauthorizedError("Invalid Password!")
            }
            const token = jwt.sign({ id: user.id },
                config.auth.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, 
                }
            );
            return({
                id: user._id,
                name: user.name,
                email: user.email,
                accessToken: token
            });
        } catch (error) {
            throw error;
        }
    }
}

export default new UsersService();