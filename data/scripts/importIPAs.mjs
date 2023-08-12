import {db} from './db.mjs'
import fs from 'fs'

const IPAs = JSON.parse(fs.readFileSync('../IPAs_en_UK.json')).en_UK[0]
const keys = Object.keys(IPAs)
console.dir(IPAs)

for (const element of keys) {
    await db('dictionary')
    .where('word', element)
    .update({
        pronunciation: IPAs[element]
    }).then(res=>{
        if(res==1){console.log("added data for "+element)
    } else {console.error("failed to import for "+element+". Perhaps it doesn't exist.")}
})
    
}
db.destroy()