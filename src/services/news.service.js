import News from "../models/news.js";

class NewsService {
    async getAll() {
        return await News.find({});
        
        // return Block.findAll({ order: [ ['order', 'ASC'], ['id', 'ASC']] })
        // if (page) {
        //     return Block.findAll({ where: { page }, order: [ ['order', 'ASC'], ['id', 'ASC'] ] })
        // } else {
        //     return Block.findAll({ order: [ ['order', 'ASC'], ['id', 'ASC']] })
        // }
    }
    // async getByCodeAndPage(page = null, code = null) {
    //     return Block.findAll({where: {page, code}, order: [['order', 'ASC'], ['id', 'ASC']]});
    // }
    // async update(id, data) {
    //     try {
    //         const record = await Block.update(data, {where: {id: id}})
    //         return Block.findOne({where: {id: id}})
    //     } catch (error) {
    //         throw error;
    //     } 
    // }
}

export default new NewsService();