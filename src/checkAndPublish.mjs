import getNewPrompt from "./getNewPrompt.mjs"
import createNote from "./createNote.mjs"
import makeText from "./makeText.mjs"
import insertPublished from "./insertPublished.mjs"
import logger from "./logger.mjs"
import todaysPromptAlreadyPublished from "./todaysPromptAlreadyPublished.mjs"


export default  async function checkAndPublish () {
    logger.trace("checkAndPublish called")
    logger.trace(todaysPromptAlreadyPublished())
    if(!await todaysPromptAlreadyPublished()){
        try {
            const prompt = await getNewPrompt()
            try {
                const text = makeText(prompt)
                try {
                    const note = await createNote(text)
                    try {
                        await insertPublished(note, prompt.word)
                    } catch (error) {
                        logger.error(error, 'insertPublished failed!')
                    }
                } catch (error) {
                    logger.error(error, 'createNote failed!')
                }
            } catch (error) {
                logger.error(error, 'makeText failed!')
            }  
        } catch (error) {
            logger.error(error,'getNewPrompt failed!')
        }   
    } else {
        logger.trace("today's prompt has already been published")
    }
}






