import logger from "../logger.mjs"
import { checkSpelling } from "spellchecker"
import { wordIsAlreadyInBuffer, getAcceptablePrompts } from "../database-calls/db.mjs"

export default async function (note) {
    const childLogger = logger.child({note})
    childLogger.trace("receiveMention called")
    const textArray = note.text
    .replace(/@[a-z,A-Z,0-9]* /g, "")
    .trim()
    .match(/[a-z]*/ig)
    if(textArray.length===1){
        const word = textArray[0]
        if(checkSpelling(word)){
            if(await getAcceptablePrompts().indexOf(word)!=-1){
                // if(!wordIsAlreadyInBuffer(word)){

                // }
            }
        }
        
            
            //ETC
    }else if(textArray.length>1){
        //"Please reply with one word, I'm only a bot etc etc"
    }
    
}