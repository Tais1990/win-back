
import mongoose from 'mongoose';

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