import Knex from 'knex'
import logger from '../logger.mjs'
import { isoDate } from "../utilities.mjs"

export const db = Knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "data/database"
  },
  useNullAsDefault: true
})

export const getWords = async () => {
  logger.trace("getWords called")
  return db
    .select("word")
    .from("dictionary")
    .catch(error => { throw error })
}

export const valueExistsInTable = async (table, column, value) => {
  try {
    const number = await db(table)
      .count('* as count')
      .where(column, value)
      return number[0].count > 0
  } catch (error) {
    logger.error("valueExistsInTable failed!")
    throw error
  }
  
}


export const todaysPromptAlreadyPublished = async () => {
  return valueExistsInTable('published', 'date', isoDate())
}

export const wordIsAlreadyInBuffer = async (word) => {
  return valueExistsInTable('buffer', 'word', word)
}