import getNewPrompt from "./getNewPrompt.mjs"
import createNote from "./createNote.mjs"
import makeText from "./makeText.mjs"
const maxCount = 30000000
const minCount = 200000


const spam = async ()=>{
    await createNote(
        makeText(
            await getNewPrompt({maxCount,minCount,rarityBias:0.7})
        )
    )
}



const delay = ms => new Promise(res=>{setTimeout(res,ms)})

do{
await delay(3000)
await spam()
console.log("SPAM!")
}while(true)