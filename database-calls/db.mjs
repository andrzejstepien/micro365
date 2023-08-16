import Knex from 'knex'
import logger from '../logger.mjs'
import { isoDate } from "../utilities.mjs"
import config from "../config.mjs"

export const db = Knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    //filename: "data/database"
    filename: "data/database-testing"
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


export const getWords = async () => {
  logger.trace("getWords called")
  return db
    .select("word")
    .from("dictionary")
    .catch(error => { throw error })
}

export const insertIntoBuffer = async (word,timestamp) => {
    return db('buffer')
    .insert({
      word:word,
      timestamp:timestamp
    })
}



export const valueExistsInColumn = async (table, column, value) => {

    const number = await db(table)
      .count('* as count')
      .where(column, value)
    return number[0].count > 0
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
    const number = await db(table)
      .count('* as count')
    return number[0].count > 0
}

export const getPromptFromBuffer = async () => {
  logger.trace("getting prompt from buffer")
  const oldestWordInBuffer = await db('buffer').select('word').orderBy('timestamp', 'asc').limit(1)
  const word = oldestWordInBuffer[0].word
  if(!word){throw new Error("Requested oldest word in buffer but got an empty array! Is buffer empty?")}
    const prompt = await getAcceptablePrompts(word)
    if(prompt.length===0){throw new Error("Prompt from buffer is not acceptable! Has it already been published? Have the acceptability criteria changed?")}
    return prompt[0]
}

export const deleteFromBuffer = async (word) => {
  logger.trace(`deleteFromBuffer called for word ${word}!`)
    return db('buffer')
    .where('word', word)
    .del()
}


export const getDatePublished = async (word) => {
    return db('published')
    .select('date')
    .where('word',word)
}
