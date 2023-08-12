import { db } from "./db.mjs";
import { isoDate } from "../utilities.mjs";
import logger from "../logger.mjs";
export default async function todaysPromptAlreadyPublished() {
    try {
        const number = await db('published')
        .count('* as count')
        .where('date', isoDate())
        return number[0].count > 0
    } catch (error) {
        logger.error("todaysPromptAlreadyPublished failed!")
        throw error
    }
    
}

//console.log(await todaysPromptAlreadyPublished())
