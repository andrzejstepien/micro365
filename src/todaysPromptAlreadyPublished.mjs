import { db } from "./db.mjs";
import { isoDate } from "./utilities.mjs";
import logger from "./logger.mjs";
export default async function todaysPromptAlreadyPublished() {
    const childLogger = logger.child()
    childLogger.trace("todaysPromptAlreadyPublished called")
    const number = await db('published')
        .count('* as count')
        .where('date', isoDate())
        .catch(error=>{throw error})
    return number[0].count > 0
}

//console.log(await todaysPromptAlreadyPublished())
