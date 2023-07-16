
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');
const pipeline = fs.createReadStream('data/dp/wiktionary-grouped-objects-array.json').pipe(StreamArray.withParser());

const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("data/database")

const queries = []

pipeline.on('data', data => {
    const term = data.value.word
    // if(term==="unpalatable"){console.log("test word found!!")}
    const object = JSON.stringify(makeObject(data.value))
    // db.run('UPDATE prompts SET object=? WHERE word=?',[object,term],
    // function(err){
    //   if(err){return console.error(err.message)}
    //   console.log(`word: ${term} -- ${this.changes} changes`)
    //   console.log(`object: ${object}`)
    // })

    queries.push(`${queries}UPDATE prompts 
    SET object='${object}'
    WHERE word='${term}';
    `)
  console.log(queries)
    });

db.exec(queries.join()).close(err=>{
  if(err){return console.error(err.message)}
  console.log("Database closed successfully")
})
   

const makeObject = (obj) => {
  const meaningsArray = []
  obj.data.forEach(element => {
    meaningsArray.push({
      type:element.type,
      definition:element.definition[0]
    })
  });
  return {
    word: obj.word,
    pronunciation: obj.data[0].pronunciation,
    meanings: meaningsArray
  }
}

