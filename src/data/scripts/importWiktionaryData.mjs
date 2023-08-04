import {db} from './db.mjs'
import fs from 'fs'

const wiktionary = JSON.parse(fs.readFileSync('../processing/wiktionary-p3.json'))

const sampleElement = {
    word: 'antinomian',
    pronunciation: '/æntiˈnoʊmi.ən/',
    meanings: [
      { type: 'noun', definitions: [Array] },
      { type: 'adj', definitions: [Array] }
    ]
  }

for (const element of wiktionary) {
    await db('dictionary')
    .where('word', element.word)
    .update({
        //deprecated now that I have a better source of IPAs
        //pronunciation: element.pronunciation,
        meanings: JSON.stringify(element.meanings)
    }).then(res=>{
        if(res==1){console.log("added data for "+element.word)
    } else {console.error("failed to import for "+element.word+". Perhaps it doesn't exist.")}
})
    
}
db.destroy()