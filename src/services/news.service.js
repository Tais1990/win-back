import { ForbiddenError, NotFoundError } from "../libs/errors.js";
import News, { EnumStatusNews } from "../models/news.js";
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
    /**
     * Релактирование новости
     * @param {*} form - данные, вводимые пользователем
     * @param {*} userID - id автора
     * @returns 
     */
    async update(form, userID) {
        try {
            let newsOne = await News.findOne({_id: form.id})
            if (!newsOne) {
                throw new NotFoundError("News not found");
            }
            // проверяем, что текущий пользователя является автором            
            if (newsOne.author.toString() !== userID) {
                throw new ForbiddenError("You don't have editing rights!")
            }
            const filter = { _id: form.id };
            let filds = ['title', 'text', 'pubDate']
            filds.forEach((field) => {
                if (Object.keys(form).includes(field)) {
                    newsOne[field] = form[field]
                }
            })
            await News.findOneAndUpdate(filter, newsOne)
            return await News.findOne({_id: form.id});
        } catch (error) {
            throw error;
        }
    }
    /**
     * удаление новости
     * @param {*} id - идентификатор новости
     * @param {*} userID - id текущего пользователя
     * @returns - данные по удалённой записи
     */
    async delete(id, userID) {
        try {
            let newsOne = await News.findOne({_id: id})
            if (!newsOne) {
                throw new NotFoundError("News not found");
            }
            // проверяем, что текущий пользователя является автором            
            if (newsOne.author.toString() !== userID) {
                throw new ForbiddenError("You don't have deleted rights!")
            }
            const filter = { _id: id };
            newsOne.status = EnumStatusNews.deleted;
            await News.findOneAndUpdate(filter, newsOne)
            return await News.findOne({_id: id});            

        } catch(error) {
            throw error;
        }
    }

    /**
     * публикация новости
     * @param {*} id - идентификатор новости
     * @param {*} userID - id текущего пользователя
     * @returns - данные по опубликованной записи
     */
    async publish(id, userID) {
        try {
            let newsOne = await News.findOne({_id: id})
            if (!newsOne) {
                throw new NotFoundError("News not found");
            }
            // проверяем, что текущий пользователя является автором            
            if (newsOne.author.toString() !== userID) {
                throw new ForbiddenError("You don't have publish rights!")
            }
            // запрещаем публиковать удалённую запись
            if (newsOne.status === EnumStatusNews.deleted) {
                throw new NotFoundError("News was deleted");
            }
            const filter = { _id: id };
            newsOne.status = EnumStatusNews.published;
            newsOne.pubDate = new Date();
            await News.findOneAndUpdate(filter, newsOne)
            return await News.findOne({_id: id});
        } catch(error) {
            throw error;
        }
    }
    /**
     * Опубликовать все новости, у которых дата публикации меньше текущей даты
     */
    async publishAll() {
        try {
            // TODO добавить всё-таки логирование
            console.log('---Start published---');
            let currentDate = new Date();
            let news = (await News.find({status: EnumStatusNews.new, pubDate: {$lt: currentDate}})).map(x => ({id: x._id.toString(), userID: x.author.toString()}))
            for (const newsOne of news) {
                await this.publish(newsOne.id, newsOne.userID)
            }
            console.log(`---All published---There are ${news.length} news`);
            return {'result': `There are ${news.length} news`}
        } catch(error) {
            throw error;
        }
    }
}

export default new NewsService();