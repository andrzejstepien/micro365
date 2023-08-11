import Knex from 'knex'
import logger from './logger.mjs'

export const db = Knex({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: "data/database"
    },
    useNullAsDefault: true
  })

 export const getWords = async (db) => {
  const childLogger = logger.child({db})
  childLogger.trace("getWords called")
    return db
    .select("word")
    .from("dictionary")
}

