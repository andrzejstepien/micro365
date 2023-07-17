
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');
const pipeline = fs.createReadStream('data/dp/wiktionary-grouped-objects-array.json').pipe(StreamArray.withParser());

const { AsyncDatabase } = require("promised-sqlite3")
//const sqlite3 = require("sqlite3").verbose()
let db = ""
const importJson = async () =>{
  db = await AsyncDatabase.open("data/database")
  // pipeline.on('data', async (data) => {
  //   const word = data.value.word
  //   const pronunciation = data.value.pronunciation
  //   const meanings = JSON.stringify(data.value.meanings)
  //   if (word === "unpalatable") { console.log("test word found!!") }
  //   await db.run('UPDATE prompts SET pronunciation=?, meanings=? WHERE word=?', [pronunciation,meanings,word])
  // });
  db = JSON.parse(fs.readFileSync('data/dp/wiktionary-grouped-objects-array.json'))
  await db.forEach(async (data) => {
    if(data.value.word != undefined){
    const word = data.value.word
    const pronunciation = data.value.pronunciation
    const meanings = JSON.stringify(data.value.meanings)
    await db.run('UPDATE prompts SET pronunciation=?, meanings=? WHERE word=?', [pronunciation,meanings,word])
  }});

}

importJson().then(()=>{
  //console.log(db)
  db.close()
})












