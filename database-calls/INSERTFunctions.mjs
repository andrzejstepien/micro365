import { isoDate } from "../utilities.mjs"
import logger from "../logger.mjs"
import { sampleRes } from "./db.mjs"

export async function insertPublished(db, res, word) {
  logger.trace("insertPublished called")
    return db('published')
      .insert({
        id: res.createdNote.id,
        word,
        date: isoDate()
      })
}

export const insertIntoBuffer = async (db,word,timestamp) => {
  return db('buffer')
  .insert({
    word:word,
    timestamp:timestamp
  })
}