import logger from "./logger.mjs"
import { db } from "./db.mjs"
import config from "./config.mjs"

const blocklist = db.union([
    db('bad_words').select('word'),
    db('medical_dictionary').select('word'),
    db('published').select('word')
])

export default async () => {
    logger.trace("getAcceptablePrompt called")
    return db('dictionary')
        .select('*')
        .where({
            derivative: 0,
            scientific: 0,
        })
        .andWhere('count', '<', config.maxCount)
        .andWhere('count', '>', config.minCount)
        .andWhere('word', 'not in', blocklist)
        .whereRaw('length(word) > 3')
        .whereNotNull('pronunciation')
        .orderByRaw('count desc')
        .catch(error=>{throw error})
}