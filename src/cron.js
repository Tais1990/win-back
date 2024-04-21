import cron from 'node-cron';
import NewsService from '../src/services/news.service.js'

export const publishAll = (periodicity = '* * * * *') => {
    cron.schedule(periodicity, async function() {
        await NewsService.publishAll();
    });
}