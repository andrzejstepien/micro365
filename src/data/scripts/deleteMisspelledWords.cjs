const Spellchecker = require("spellchecker")
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("../database")

db.serialize(() => {
    db.each("SELECT * FROM dictionary", [],
        function (err, row) {
            if (err) {
                return console.error(err.message)
            }
            if (Spellchecker.isMisspelled(row.word)) {
                db.run("DELETE from dictionary WHERE word=?", [row.word], function (err) { if (err) { return console.error(err.message) } })
                console.log(`deleted non-word ${row.word}`)
            }
        },
        function (err, rows) {
            if (err) { return console.error(err.message) }
            console.log(`${rows} rows`)
            db.close()
            console.log("db closed")
        })
})

