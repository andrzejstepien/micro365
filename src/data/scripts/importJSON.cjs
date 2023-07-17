
const fs = require('fs');
const pipeline = fs.createReadStream('../processing/wiktionary-grouped-objects-array.json').pipe(StreamArray.withParser());

const { AsyncDatabase } = require("promised-sqlite3")
let db = ""
const importJson = async () =>{
  db = await AsyncDatabase.open("database")
  json = JSON.parse(fs.readFileSync('../processing/wiktionary-grouped-objects-array.json'))
  await json.forEach(async (data) => {
    //console.log(data)
    if(data?.word){
    const word = data.word
    const pronunciation = data.pronunciation
    const meanings = JSON.stringify(data.meanings)
    await db.run('UPDATE prompts SET pronunciation=?, meanings=? WHERE word=?', [pronunciation,meanings,word])
  }});
  db.close()
}

importJson()












