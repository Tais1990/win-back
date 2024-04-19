import News from "../models/news.js";
import mongoose from "mongoose";

/**
 * сервис для работы с новостями
 */
class NewsService {
    /**
     * Показываем все новости
     * @returns - массив новостей
     */
    async getAll() {
        return await News.find({}).populate('author');
    }
    /**
     * возврат новостей с учётом ограничений по атворизации
     * @returns - массив новостей
     */
    async getMy() {
        return [
            {
                title: 'секретно',
                text: 'тенст секретной новости'
            }
        ]
    }
    /**
     * Создание новсти
     * @param {*} form - данные, вводимые пользователем
     * @param {*} userID - id автора
     * @returns 
     */
    async create(form, userID) {
        try {
            const news = await News.create({
                ...form,
                author: new mongoose.Types.ObjectId(userID)
            })
            return news;
        } catch (error) {
            throw error;
        }
    }
}

export default new NewsService();