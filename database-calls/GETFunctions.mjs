import config from '../config.mjs'
import {blocklist} from './db.mjs'
import logger from "../logger.mjs"
export const getAcceptablePrompts = async (db,word) => {
    logger.trace("getAcceptablePrompt called")
      return db('dictionary')
        .select('*')
        .where({
          derivative: 0,
          scientific: 0,
        })
        .modify(queryBuilder=>{
          if(word){queryBuilder.andWhere('word',word)}
        })
        .andWhere('count', '<', config.maxCount)
        .andWhere('count', '>', config.minCount)
        .andWhere('word', 'not in', blocklist)
        .whereRaw('length(word) > 3')
        .whereNotNull('pronunciation')
        .orderByRaw('count desc')
  }

  export const getWords = async (db) => {
    logger.trace("getWords called")
    return db
      .select("word")
      .from("dictionary")
      .catch(error => { throw error })
  }

  export async function getNewPrompt(db) {
    logger.trace("getNewPrompt called")
    
    const getBiasedRng = (min, max, bias, influence) => {
        const random = Math.random() * (max - min) + min
        const mix = Math.random() * influence
        return random * (1 - mix) + bias * mix
    }

    const randomEntry = (array) => {
        const random = getBiasedRng(0, 1, config.rarityBias, 1)
        const mix = Math.random()
        return array[
            parseInt(
                array.length * random
            )
        ]
    }

    return randomEntry(await getAcceptablePrompts(db))
}

export const getPromptFromBuffer = async (db) => {
  logger.trace("getting prompt from buffer")
  const oldestWordInBuffer = await db('buffer').select('word').orderBy('timestamp', 'asc').limit(1)
  const word = oldestWordInBuffer[0].word
  if(!word){throw new Error("Requested oldest word in buffer but got an empty array! Is buffer empty?")}
    const prompt = await getAcceptablePrompts(word)
    if(prompt.length===0){throw new Error("Prompt from buffer is not acceptable! Has it already been published? Have the acceptability criteria changed?")}
    return prompt[0]
}

export const getDatePublished = async (db,word) => {
  return db('published')
  .select('date')
  .where('word',word)
}