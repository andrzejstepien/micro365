import logger from "./logger.mjs"
import getAcceptablePrompts from "./getAcceptablePrompts.mjs"

export default async function getNewPrompt({ minCount = 200000, maxCount = 30000000, rarityBias = 0.5 }) {
    const childLogger = logger.child({minCount,maxCount,rarityBias})
    childLogger.trace("getNewPrompt called")
    
    const getBiasedRng = (min, max, bias, influence) => {
        const random = Math.random() * (max - min) + min
        const mix = Math.random() * influence
        return random * (1 - mix) + bias * mix
    }

    const randomEntry = (array) => {
        const random = getBiasedRng(0, 1, rarityBias, 1)
        const mix = Math.random()
        return array[
            parseInt(
                array.length * random
            )
        ]
    }

    return randomEntry(await getAcceptablePrompts())
}






