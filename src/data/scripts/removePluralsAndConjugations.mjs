import { db, getWords } from './db.mjs'
import fs from 'fs'

//const words = getWords(db)
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
  




const allDefinitionsArePluralOrFormOf = (meanings) => {
    let formsOf = 0
    let totalDefs = 0
    for (const obj of meanings) {
        for (const definition of obj.definitions) {
            totalDefs++
            console.dir(definition)
            if (definition.form_of == true) {
                formsOf++
            }
        }
    }
    return `Total defs: ${totalDefs}, formsOf: ${formsOf}, output: ${formsOf === totalDefs}`
}

console.log(allDefinitionsArePluralOrFormOf(sampleMeanings))