import mongoose from "mongoose";
/**
 * Схема для Юзеров
 * name - имя пользователя
 * email - email
 * password - пароль
 */
const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const Users = mongoose.model("Users", UsersSchema)

export default Users