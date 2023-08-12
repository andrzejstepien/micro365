import cron from 'node-cron'
import logger from './logger.mjs';
import checkAndPublish from './checkAndPublish.mjs';

export default function start(){
    logger.trace("start() called")
    cron.schedule('* * * * *', () => {
        checkAndPublish()
        logger.trace('one-minute cron call');
      });
}