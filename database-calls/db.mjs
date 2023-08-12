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
  const childLogger = logger.child({ db })
  childLogger.trace("getWords called")
  return db
    .select("word")
    .from("dictionary")
}

export const valueExistsInTable = async (table,column,value) =>{
  const number = await db(table)
    .count('* as count')
    .where(column, value)
    .catch(error => { throw error })
  return number[0].count > 0
}


export const todaysPromptAlreadyPublished = async () => {
  return valueExistsInTable('published','date',isoDate())
}

export const wordIsAlreadyInBuffer = async (word) => {
  return valueExistsInTable('buffer','word',word)
}