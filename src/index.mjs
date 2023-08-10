import express from "express";
import bodyParser from "body-parser";
const app = express()
const port = 4000
app.use(bodyParser.json())
app.post('/api', (req,res) => {
    console.log("webhook received:")
    console.dir(req.body.body.note.text)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})