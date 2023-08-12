import getNewPrompt from "./getNewPrompt.mjs"
import createNote from "./firefish-calls/createNote.mjs"
import makeText from "./makeText.mjs"
import insertPublished from "./database-calls/insertPublished.mjs"
import logger from "./logger.mjs"
import {todaysPromptAlreadyPublished} from "./database-calls/db.mjs"


export default  async function checkAndPublish () {
    logger.trace("checkAndPublish called")
    logger.trace(todaysPromptAlreadyPublished())
    if(!await todaysPromptAlreadyPublished()){
        try {
            const prompt = await getNewPrompt()
            logger.trace("getNewPrompt successful!")
            try {
                const text = makeText(prompt)
                try {
                    const note = await createNote(text)
                    logger.trace("createNote successful!")
                    try {
                        await insertPublished(note, prompt.word)
                        logger.trace("insertPublished successful!")
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






