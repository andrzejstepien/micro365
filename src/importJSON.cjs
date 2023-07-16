
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');
const pipeline = fs.createReadStream('data/dp/wiktionary-grouped-objects-array.json').pipe(StreamArray.withParser());

const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("data/database")


pipeline.on('data', data => {
  const term = data.value.word
  if (term === "unpalatable") { console.log("test word found!!") }
  const rawMeanings = JSON.stringify(makeObject(data.value))
  db.run('UPDATE prompts SET object=? WHERE word=?', [object, term],
    function (err) {
      if (err) { return console.error(err.message) }
      console.log(`word: ${term} -- ${this.changes} changes`)
      console.log(`object: ${object}`)
    })
    console.log(`object: ${object}`)
});

db.close()


const makeObject = (obj) => {
  const meaningsArray = []



for(let i=0; i<=obj.meanings.length-1;i++){
  meaningsArray.push({
    type: element.type,
    definition: element.definition[0]
  })
}
 
  return {
    word: obj.word,
    pronunciation: obj.pronunciation,
    meanings: meaningsArray
  }
}

