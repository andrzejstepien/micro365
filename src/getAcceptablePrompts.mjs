import logger from "./logger.mjs"
import { db } from "./db.mjs"

const blocklist = db.union([
    db('bad_words').select('word'),
    db('medical_dictionary').select('word'),
    db('published').select('word')
])

export default async () => {
    return db('dictionary')
        .select('*')
        .where({
            derivative: 0,
            scientific: 0,
        })
        .andWhere('count', '<', maxCount)
        .andWhere('count', '>', minCount)
        .andWhere('word', 'not in', blocklist)
        .whereRaw('length(word) > 3')
        .whereNotNull('pronunciation')
        .orderByRaw('count desc')
        .catch(error=>{throw error})
}