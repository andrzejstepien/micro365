import daily from "./daily.mjs"
import logger from "./logger.mjs"
const maxCount = 30000000
const minCount = 200000


const spam = async ()=>{
    await daily()
}



const delay = ms => new Promise(res=>{setTimeout(res,ms)})

do{
await delay(1000)
await spam()
logger.trace("Spam!")
}while(true)