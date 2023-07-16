import makeToot from "./makeToot.js"
const word = "and"
const output = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
.then(res=>res.json()).then(json=>{

    makeToot(json[0])
})


