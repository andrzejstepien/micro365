import express from "express";
import bodyParser from "body-parser";
import logger from "./logger.mjs";
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

process.on('uncaughtException', (err) => {
    // log the exception
    logger.fatal(err, 'uncaught exception detected');
    // shutdown the server gracefully
    server.close(() => {
      process.exit(1); // then exit
    });
  
    // If a graceful shutdown is not achieved after 1 second,
    // shut down the process completely
    setTimeout(() => {
      process.abort(); // exit immediately and generate a core dump file
    }, 1000).unref()
    process.exit(1);
  });