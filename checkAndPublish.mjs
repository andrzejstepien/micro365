import getNewPrompt from "./database-calls/getNewPrompt.mjs"
import createNote from "./firefish-calls/createNote.mjs"
import makeText from "./makeText.mjs"
import insertPublished from "./database-calls/insertPublished.mjs"
import logger from "./logger.mjs"
import {deleteFromBuffer, todaysPromptAlreadyPublished, tableIsNotEmpty, getPromptFromBuffer} from "./database-calls/db.mjs"


export default  async function checkAndPublish () {
    logger.trace("checkAndPublish called")
    logger.trace(todaysPromptAlreadyPublished())
    if(!await todaysPromptAlreadyPublished()){
        try {            
            const prompt = await tableIsNotEmpty('buffer') ? await getPromptFromBuffer() : await getNewPrompt()
            logger.trace({prompt:prompt},"prompt acquired successfully!")
            try {
                const text = makeText(prompt)
                try {
                    const note = await createNote(text)
                    logger.trace("createNote successful!")
                    try {
                        await deleteFromBuffer(prompt.word)
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
            logger.error(error,'failed to get prompt!')
        }   
    } else {
        logger.trace("today's prompt has already been published")
    }
}






