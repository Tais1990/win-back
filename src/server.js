
import express from 'express'
import routerAPI from './routes/index.js'
import { mongoConnect } from './db.js';
const config = (await import(`../src/config.js`)).default(process.env.NODE_ENV)

const PORT = config.api.PORT || 3201;
const app = express();

app.use(express.json());
app.disable('etag');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json('All right')
})


app.use('/api', routerAPI)

const connectionString = `mongodb+srv://${config.mongodb.login}:${config.mongodb.password}@cluster0.dearloa.mongodb.net/${config.mongodb.databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

const start = async () => {
    try {
        await mongoConnect(connectionString);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()