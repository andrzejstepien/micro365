import getNewPrompt from "./getNewPrompt.mjs"
import createNote from "./createNote.mjs"
import makeToot from "./makeToot.mjs"
const maxCount = 30000000
const minCount = 200000


const prompt = await getNewPrompt({minCount,maxCount,rarityBias:0.7})
//console.dir(prompt)

const toot = makeToot(prompt)
//console.dir(toot)



//CHECK BUFFER - 
    //IF EXISTS, POST NEXT BUFFERED PROMPT TO SOCIAL MEDIA
    //REMOVE FROM BUFFER
    //ADD TO PUBLISHED
//ELSE, CHECK LAST X ENTRIES IN PUBLISHED -- set maxCount and minCount accordingly (if recent prompts trend common, go rarer etc)
//GET RANDOM PROMPT
//POST TO SOCIAL
//ADD TO PUBLISHED 
