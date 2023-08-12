import logger from "./logger.mjs"
import { getAcceptablePrompts } from "./database-calls/db.mjs"
import config from "./config.mjs"

export default async function getNewPrompt() {
    logger.trace("getNewPrompt called")
    
    const getBiasedRng = (min, max, bias, influence) => {
        const random = Math.random() * (max - min) + min
        const mix = Math.random() * influence
        return random * (1 - mix) + bias * mix
    }

    const randomEntry = (array) => {
        const random = getBiasedRng(0, 1, config.rarityBias, 1)
        const mix = Math.random()
        return array[
            parseInt(
                array.length * random
            )
        ]
    }

    return randomEntry(await getAcceptablePrompts())
}






