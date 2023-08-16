import createNote from "./firefish-calls/createNote.mjs"
import makeText from "./makeText.mjs"
import insertPublished from "./database-calls/INSERTFunctions.mjs"
import logger from "./logger.mjs"
import { deleteFromBuffer } from "./database-calls/DELETEFunctions.mjs"
import { todaysPromptAlreadyPublished, tableIsNotEmpty } from "./database-calls/EXISTSFunctions.mjs"
import { getPromptFromBuffer, getNewPrompt } from "./database-calls/GETFunctions.mjs"

export default  async function checkAndPublish (db) {
    logger.trace("checkAndPublish called")
    logger.trace(todaysPromptAlreadyPublished(db))
    if(!await todaysPromptAlreadyPublished(db)){
        try {            
            const prompt = await tableIsNotEmpty(db,'buffer') ? await getPromptFromBuffer(db) : await getNewPrompt(db)
            logger.trace({prompt:prompt},"prompt acquired successfully!")
            try {
                const text = makeText(prompt)
                try {
                    const note = await createNote(text)
                    logger.trace("createNote successful!")
                    try {
                        let response = await deleteFromBuffer(db,prompt.word)
                        if(response===0){logger.error("deleteFromBuffer failed! Are you trying to delete a word that isn't there?")}
                        response = await insertPublished(db,note, prompt.word)
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






