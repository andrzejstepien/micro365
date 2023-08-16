import logger from "../logger.mjs"

export const deleteFromTable = async (db,table,word) => {
  logger.trace(`deleteFromBuffer called for word ${word}!`)
    return db(table)
    .where('word', word)
    .del()
}



export const deleteFromBuffer = async (db,word) => {
    logger.trace(`deleteFromBuffer called for word ${word}!`)
      return deleteFromTable(db,'buffer',word)
  }

export const deleteFromPublished = async (db,word) => {
  logger.trace(`delteFromPublished called for word ${word}`)
  return deleteFromTable(db,'published',word)
}