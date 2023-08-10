import express from "express";

const app = express()
const port = 4000

app.get('/api', (req,res) => {
    console.log("webhook received")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})