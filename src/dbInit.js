import { mongoConnect } from './db.js';
const config = (await import(`../src/config.js`)).default('dev')
const connectionString = `mongodb+srv://${config.mongodb.login}:${config.mongodb.password}@cluster0.dearloa.mongodb.net/${config.mongodb.databaseName}?retryWrites=true&w=majority&appName=Cluster0`;
import newsService from './services/news.service.js';
import usersService from './services/users.service.js';

const start = async () => {
    try {
        await mongoConnect(connectionString);
        // создаём пользовтелей
        let user1 = await usersService.registerUser({name: 'test1', email: 't1@mail.ru', password: '123'});
        let user2 = await usersService.registerUser({name: 'test2', email: 't2@mail.ru', password: '123'});
        console.log('Пользователи', user1, user2);
        let news1 = await newsService.create({title: 'заголовок новости для test1', text: 'текст новой новости для test1'}, user1.id)
        let news2 = await newsService.create({title: 'заголовок новости для test2', text: 'текст новой новости для test2', pubDate: new Date("2025-04-19T15:59:06.978Z")}, user2.id)
        let news3 = await newsService.create({title: 'заголовок новости для test2 с открытой пубикацией', text: 'текст новой новости для test2 c путой датой публикации', pubDate: null}, user2.id)
        console.log('Новости', news1, news2, news3);

    } catch (e) {
        console.log(e)
    }
}

start()