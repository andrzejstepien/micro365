import Knex from 'knex'
import logger from '../logger.mjs'
import { isoDate } from "../utilities.mjs"
import config from "../config.mjs"

export const db = Knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "data/database"
    //filename: "data/database-testing"
  },
  useNullAsDefault: true
})
const blocklist = db.union([
  db('bad_words').select('word'),
  db('medical_dictionary').select('word'),
  db('published').select('word')
])

export const getAcceptablePrompts = async (word) => {
  logger.trace("getAcceptablePrompt called")
  try {
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
  } catch (error) {
    logger.error("getAcceptablePrompts failed!")
    throw error
  }
}


export const getWords = async () => {
  logger.trace("getWords called")
  return db
    .select("word")
    .from("dictionary")
    .catch(error => { throw error })
}

export const insertIntoBuffer = async (word,timestamp) => {
  try {
    return db('buffer')
    .insert({
      word:word,
      timestamp:timestamp
    })
  } catch (error) {
    logger.error("buffer insert failed!")
    throw error
  }
}



export const valueExistsInColumn = async (table, column, value) => {
  try {
    const number = await db(table)
      .count('* as count')
      .where(column, value)
    return number[0].count > 0
  } catch (error) {
    logger.error("valueExistsInColumn failed!")
    throw error
  }

}

export const wordExistsInDictionary = async (word) => {
  return valueExistsInColumn('dictionary','word',word)
}

export const todaysPromptAlreadyPublished = async () => {
  return valueExistsInColumn('published', 'date', isoDate())
}

export const wordIsAlreadyInBuffer = async (word) => {
  return valueExistsInColumn('buffer', 'word', word)
}

export const tableIsNotEmpty = async (table) => {
  try {
    const number = await db(table)
      .count('* as count')
    return number[0].count > 0
  } catch (error) {
    throw error
  }
}

export const getPromptFromBuffer = async () => {
  logger.trace("getting prompt from buffer")
  const oldestWordInBuffer = await db('buffer').select('word').orderBy('timestamp', 'asc').limit(1)
  logger.info(`oldest word in buffer: ${oldestWordInBuffer[0].word}`)
  try {
    const prompt = await getAcceptablePrompts(oldestWordInBuffer[0].word)
    return prompt[0]
  } catch (error) {
    logger.error("getPromptFromBuffer failed!")
    throw error
  }
}

export const deleteFromBuffer = async (word) => {
  logger.trace(`deleteFromBuffer called for word ${word}!`)
  try {
    return db('buffer')
    .where('word', word)
    .del()
  } catch (error) {
    logger.error("deleteFromBuffer failed!")
  }
}


export const getDatePublished = async (word) => {
  try {
    return db('published')
    .select('date')
    .where('word',word)
  } catch (error) {
    throw error
  }
}
