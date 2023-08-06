import { db } from "./db.mjs"

export default async function getNewPrompt({minCount = 200000, maxCount = 30000000, rarity}) {
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
        .orderByRaw('count desc')
    
        const getBiasedRng = (min,max,bias,influence) => {
            const random = Math.random() * (max - min) + min
            const mix = Math.random() * influence
            return random * (1-mix) + bias * mix
        }

    const randomEntry = (array) => {
        const random = getBiasedRng(0,1,rarity,1)
        const mix = Math.random()
        console.log("RANDOM: "+random)
        return array[
            parseInt(
                array.length * random
            )
        ]
    }

    db.destroy()
    return randomEntry(prompts).count
}



console.log(await getNewPrompt({rarity:1}))



