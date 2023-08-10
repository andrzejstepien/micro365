import getNewPrompt from "./getNewPrompt.mjs"
import createNote from "./createNote.mjs"
import makeText from "./makeText.mjs"
import insertPublished from "./insertPublished.mjs"
const maxCount = 30000000
const minCount = 200000

export default  async function daily () {
    const prompt = await getNewPrompt({ minCount, maxCount, rarityBias: 0.7 })

    const text = makeText(prompt)

    const note = await createNote(text)

    insertPublished(note, prompt.word)
}







