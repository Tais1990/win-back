import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Users from "./users.js";

/**
 * Перечисление со статусами для новостей
 * new - созданная
 * published - опубликованная
 * deleted - удалённая
 */
export const EnumStatusNews = {
    new: 'new',
    published: 'published', 
    deleted: 'deleted'
}

/**
 * Схема для новостей
 * title - заголовок
 * text - текст новости
 * created - дата создания
 * pubDate - дата публикации
 * author - автор
 * status - статус
 */
const NewsSchema = new mongoose.Schema({
    /** Заголовок новости */
    title: {
        type: String,
        require: false
    },
    /** основной текст новости */
    text: {
        type: String,
        require: 'Text is require!'
    },
    /** дата создания */
    created: {
		type: Date,
		default: Date.now,
		required: false
	},
    /** дата публикации */
    pubDate: {
        type: Date,
		default: Date.now,
		required: false
    },
    /** автор новости */
    author: { 
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    /** статус новости - новая, опубликовнная, удалённая */
    status: {
        type: String,
        enum : Object.values(EnumStatusNews),
        default: EnumStatusNews.new
    }    
})



const News = mongoose.model("News", NewsSchema)

export default News