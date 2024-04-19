import mongoose from "mongoose";
/**
 * Схема для Юзеров
 * name - имя пользователя
 * email - email
 * password - пароль
 */
const UsersSchema = new mongoose.Schema({
    /** имя */
    name: {
        type: String,
        require: true
    },
    /** email */
    email: {
        type: String,
        require: true
    },
    /** пароль зашифрованный */
    password: {
        type: String,
        require: true
    }
})

const Users = mongoose.model("Users", UsersSchema)

export default Users