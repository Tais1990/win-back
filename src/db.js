
import mongoose from 'mongoose';
/** Подключение к Mongodb Atlas */
const mongoConnect = async (connectionString) => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true
        })
        console.log('Connected to Mongodb Atlas');
    }
    catch (error) {
        console.error(error);
    }
} 

export {mongoConnect}