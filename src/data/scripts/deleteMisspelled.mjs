import Knex from 'knex';
import Spellchecker, { isMisspelled } from 'spellchecker'

const db = Knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "../database"
  }
})

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
      console.log()
    }
  }
  console.dir(element.word)
}

try {
  db.destroy()
} catch (error) {
  console.error(error.message)
}
