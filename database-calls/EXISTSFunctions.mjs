import { isoDate } from "../utilities.mjs"
export const valueExistsInColumn = async (db, table, column, value) => {

    const number = await db(table)
      .count('* as count')
      .where(column, value)
    return number[0].count > 0
}

export const wordExistsInDictionary = async (db, word) => {
  return valueExistsInColumn(db,'dictionary','word',word)
}

export const todaysPromptAlreadyPublished = async (db) => {
  return valueExistsInColumn(db,'published', 'date', isoDate())
}

export const wordIsAlreadyInBuffer = async (db, word) => {
  return valueExistsInColumn(db,'buffer', 'word', word)
}

export const tableIsNotEmpty = async (db, table) => {
    const number = await db(table)
      .count('* as count')
    return number[0].count > 0
}