import { db } from '../../database-calls/db.mjs'
import { getWords } from '../../database-calls/GETFunctions.mjs'


const words = await getWords(db)
const allDefinitionsAreScientific = (meanings) => {
    const scientificTags = [
        "sciences",
        "mathematics",
        "natural-sciences",
        "algebra",
        "medicine"
    ]
    let scientific = 0
    let totalDefs = 0
    for (const meaning of meanings) {
        for (const definition of meaning.definitions) {
            totalDefs++
            if (definition.topics) {
                for (const topic of definition.topics) {
                    if (scientificTags.includes(topic)) {
                        scientific++
                        break
                    }
                }
            }
        }
    }
    return scientific === totalDefs
}

let updated = []

for (const word of words) {
    const res = await db('dictionary')
        .select('meanings')
        .where('word', word.word)
    const meanings = JSON.parse(res[0].meanings)
    if (allDefinitionsAreScientific(meanings)) {
        await db('dictionary')
            .where('word', word.word)
            .update('scientific', 1)
        updated.push(word.word)
    }
}

console.log(`${updated.length} words with only scientific definitions found.`)


db.destroy()