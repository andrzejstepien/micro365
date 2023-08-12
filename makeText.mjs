
import logger from "./logger.mjs"
import { removeUrls } from "./utilities.mjs"
const sampleData = {
    word: 'malt',
    count: 1520084,
    pronunciation: '/mˈɒlt/',
    meanings: '[{"type":"noun","definitions":[{"definition":"Malted grain (sprouted grain) (usually barley), used in brewing and otherwise.","form_of":false,"topics":null},{"definition":"Malt liquor, especially malt whisky.","form_of":false,"topics":null},{"definition":"A milkshake with malted milk powder added for flavor.","form_of":false,"topics":null},{"definition":"Maltose-rich sugar derived from malted grain.","form_of":false,"topics":null}]},{"type":"verb","definitions":[{"definition":"To convert a cereal grain into malt by causing it to sprout (by soaking in water) and then halting germination (by drying with hot air) in order to develop enzymes that can break down starches and proteins in the grain.","form_of":false,"topics":null},{"definition":"To become malt.","form_of":false,"topics":null},{"definition":"To drink malt liquor.","form_of":false,"topics":null}]}]',
    derivative: 0,
    scientific: 0
}

export default function makeText(prompt) {
    const childLogger = logger.child({ prompt })
    childLogger.trace("makeText called")
    const meanings = JSON.parse(prompt.meanings)
    const word = prompt.word
    const pronunciation = prompt.pronunciation

    let text = "Today's #micro365 prompt is:\n<small><small><small># </small></small></small>$[x2 $[font.serif **" + word + "**]]\n"
        + pronunciation + "\n"


    let meaningsText = "<small>"
    const maxDefsPerMeaning = [3, 1, 1, 0] //this array must have at least four entries to account for different word types
    let meaningsIterator = 0
    for (const meaning of meanings) {
        if (maxDefsPerMeaning[meaningsIterator] > 0) {
            meaningsText = meaningsText + "**" + meaning.type + "**:\n"
        }

        let definitionsIterator = 1
        for (const definition of meaning.definitions) {
            if (definitionsIterator <= maxDefsPerMeaning[meaningsIterator]) {
                meaningsText = meaningsText + "- " + removeUrls(definition.definition) + "\n"
            } else {
                meaningsText = meaningsText
                break
            }
            definitionsIterator++
        }
        meaningsIterator++
    }
    meaningsText = meaningsText + "</small>"

    let postScript = "#writing #microfiction #vss #" + word
    return text + meaningsText + postScript
}


