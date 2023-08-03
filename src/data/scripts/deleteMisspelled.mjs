import {db} from './db.mjs'
import Spellchecker, { isMisspelled } from 'spellchecker'

const getWords = async (db) => {
    return db
    .select("word")
    .from("dictionary")
}

const words = await getWords(db)
console.dir(words)
for (const element of words) {
  if(isMisspelled(element.word)){
    try {
      await db('dictionary')
      .where('word', element.word)
      .del()
      console.log("deleted non-word " + element.word)
    } catch (error) {
      console.error(error.message)
    } finally {
    }
  }
}

try {
  db.destroy()
} catch (error) {
  console.error(error.message)
}
