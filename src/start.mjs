import cron from 'node-cron'
import logger from './logger.mjs';

export default function start(){
    cron.schedule('* * * * *', () => {
        logger.trace('running a task every minute');
      });
}