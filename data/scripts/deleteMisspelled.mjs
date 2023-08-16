import {db, getWords} from './db.mjs'
import { isMisspelled } from 'spellchecker'



const words = await getWords(db)
console.dir(words)
for (const element of words) {
  if(isMisspelled(element.word)){
      await db('dictionary')
      .where('word', element.word)
      .del()
      console.log("deleted non-word " + element.word)
  }
}


