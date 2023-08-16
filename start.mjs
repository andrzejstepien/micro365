import cron from 'node-cron'
import logger from './logger.mjs';
import checkAndPublish from './checkAndPublish.mjs';
import { isoDate } from './utilities.mjs';

export default function start(db){
    process.env.TZ = 'Europe/Madrid'
    logger.trace("start() called")
    logger.trace(Date())
    logger.trace(isoDate())
    checkAndPublish(db)
    cron.schedule('* * * * *', () => {
        checkAndPublish(db)
        logger.trace('one-minute cron call');
      });
}