import fs from 'fs';
import Files from '../models/files.js';
const config = (await import(`../config.js`)).default(process.env.NODE_ENV)
import { v4 as uuidv4 } from 'uuid'
import path from 'path';

/**
 * Сервис для работы с фалами
 */
class FileService {
    /**
     * Загрузка файла на сервак
     * @param {*} file - файл
     * @returns - url куда собрали файл
     */
    async upload(file) {
        try {
            const type = file.name.split('.').pop()
            const title = file.name;
            const name = `${uuidv4()}.${type}`
            let path_ = path.join(config.files.path, name);
            if (!fs.existsSync(config.files.path)) {
                throw new Error('Dir not found')
            } 
            file.mv(path_)            
            const dbFile = await Files.create({name, title, type})
            //TODO понять. как задаать через конфиги целиком данные о том, куда сохраняются файлы
            
            return {url: `http://localhost:${config.api.port}/static/files/${name}`};
        } catch (error) {
            throw error;
        }
    }
}


export default new FileService();