import { db } from "./db.mjs"
import { randomSkewNormal, randomSkewNormalTrimmed } from "./skewNormal.mjs"

const maxCount = 30000000
const minCount = 200000

export default async function getNewPrompt() {
    const badWords = await db('bad_words')
        .select('word')

    const prompts = await db('dictionary')
        .select('*')
        .where({
            derivative: 0,
            scientific: 0,
        })
        .andWhere('count', '<', maxCount)
        .andWhere('count', '>', minCount)
        .andWhere('word', 'not in', badWords)
        .whereNotNull('pronunciation')
        .orderBy('count')


    const randomEntry = (array) => {
        //const random = (randomSkewNormal(Math.random,0,2,0)/6)
        const random = Math.random()
        return array[
            parseInt(
                array.length * random
            )
        ]
    }
    db.destroy()
    return randomEntry(prompts)
}



console.log(await getNewPrompt())


