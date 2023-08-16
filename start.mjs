import cron from 'node-cron'
import logger from './logger.mjs';
import checkAndPublish from './checkAndPublish.mjs';

export default function start(db){
    logger.trace("start() called")
    checkAndPublish(db)
    cron.schedule('* * * * *', () => {
        checkAndPublish(db)
        logger.trace('one-minute cron call');
      });
}