import daily from "./daily.mjs"
const maxCount = 30000000
const minCount = 200000


const spam = async ()=>{
    await daily()
}



const delay = ms => new Promise(res=>{setTimeout(res,ms)})

do{
await delay(3000)
await spam()
console.log("SPAM!")
}while(true)