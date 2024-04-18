import newsService from "../services/news.service.js"

class NewsController {
    async getAll(req, res) {
        try {         
            let result = await newsService.getAll()
            return res.json(result)
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
    async getMy(req, res) {
        try {         
            let result = await newsService.getMy()
            return res.json(result)
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
    // async getBlock(req, res) {
    //     try {         
    //         let result = await blocksService.getByCodeAndPage(req.params.page || null, req.params.code || null)
    //         return res.json(result)
    //     }
    //     catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ error: error })
    //     }
    // }
    // async put(req, res) {
    //     try {  
    //         return res.json(await blocksService.update(req.params.id, req.body))
    //     }
    //     catch (error) {
    //         // TODO попробовать разобратсья с с разными статусами ошибки
    //         return res.status(500).json({
    //             status: error.status || 500,
    //             message: error.message,
    //             stack: error.stack,
    //             detail: error.name === FormError.name ? error.message : 'К сожалению на сервере возникла ошибка при сохранении документа. Попробуйте отправить запрос позе, или написать на почту'
    //         })
    //     }
    // }
}

export default new NewsController();