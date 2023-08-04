import { db, getWords } from './db.mjs'
import fs from 'fs'

//const words = getWords(db)
const allDefinitionsAreFormOf = (meanings) => {
    let formsOf = 0
    let totalDefs = 0
    for (const meaning of meanings) {
        for (const definition of meaning.definitions) {
            totalDefs++
            if (definition.form_of == true) {
                formsOf++
            }
        }
    }
    return formsOf === totalDefs
}
const sampleMeanings =[
      {
        "type": "noun",
        "definitions": [
          {
            "definition": "plural of look",
            "form_of": true,
            "plural": true
          },
          {
            "definition": "One's appearance or attractiveness.",
            "form_of": false,
            "plural": true
          }
        ]
      },
      {
        "type": "verb",
        "definitions": [
          {
            "definition": "third-person singular simple present indicative form of look",
            "form_of": true,
            "plural": false
          }
        ]
      }
    ]
const words = await getWords(db)
const deleted = []
for (const word of words) {
    const res = 
    await db('dictionary')
    .select('meanings')
    .where('word', word.word)
    const meanings = JSON.parse(res[0].meanings)
    if(allDefinitionsAreFormOf(meanings)){
        deleted.push(word)
    }
}
console.log(`${deleted.length} entries deleted`)
console.dir(deleted)
db.destroy()


