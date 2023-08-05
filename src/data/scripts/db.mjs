import Knex from 'knex'

export const db = Knex({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: "../database"
    }
  })

 export const getWords = async (db) => {
    return db
    .select("word")
    .from("dictionary")
}

export const getBadWords = async (db) => {
  return db
    .select("word")
    .from("bad_words")
}