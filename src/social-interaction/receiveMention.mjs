import logger from "../logger.mjs"
import getAcceptablePrompts from "../getAcceptablePrompts.mjs"
import { checkSpelling } from "spellchecker"

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
                
            }
        }
        
            
            //ETC
    }else if(textArray.length>1){
        //"Please reply with one word, I'm only a bot etc etc"
    }
    
}