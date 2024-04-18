import mongoose from "mongoose";

/**
 * Схема для новостей
 * title - заголовок
 * text - текст новости
 */
const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    }
})

const News = mongoose.model("News", NewsSchema)

export default News