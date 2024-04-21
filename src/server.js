
import express from 'express'
import routerAPI from './routes/index.js'
import fileUpload from 'express-fileupload';
import { mongoConnect } from './db.js';
import cors from 'cors';
const config = (await import(`../src/config.js`)).default(process.env.NODE_ENV)
import { publishAll } from './cron.js'

//TODO перетащить в конфиг
var corsOptions = {
    origin: "http://localhost:3200"
  };

const PORT = config.api.port || 3201;
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload({}))

app.disable('etag');

app.use('/static', express.static(config.files.publicDir));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json('Welcome to test application.')
})


app.use('/api', routerAPI)

const connectionString = `mongodb+srv://${config.mongodb.login}:${config.mongodb.password}@cluster0.dearloa.mongodb.net/${config.mongodb.databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

const start = async () => {
    try {
        await mongoConnect(connectionString);
        publishAll();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()