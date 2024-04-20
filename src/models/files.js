import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Схема для файлов
 * title - имя файла, отображаемое, которое при отправке
 * name - уникальное имя файла, которое генерируется при записи на диск
 * type - тип файла
 */
const FilesSchema = new mongoose.Schema({
    /** Заголовок файла */
    title: {
        type: String,
        require: 'Title is require!'
    },
    /** имя файла при сохранении, уникальное */
    name: {
        type: String,
        require: 'Name is require!'
    } ,
    /** тип файла */
    type: {
        type: String,
        require: 'Type is require!'
    }    
})



const Files = mongoose.model("Files", FilesSchema)

export default Files