import express from "express";
import bodyParser from "body-parser";
import logger from "./logger.mjs";
import pinoHTTP from 'pino-http'
import start from "./start.mjs";
import handleMention from "./social-interaction/handleMention.mjs";
const app = express()
const port = 4000
app.use(bodyParser.json())
app.use(
    pinoHTTP({
      logger,
    })
  )
app.post('/api', async (req,res) => {
    logger.info({body:req.body.body},"webhook received!")
    res.sendStatus(200)
    const result = await handleMention(req.body.body)
    logger.info(`handleMention returned ${result.code}`)
})

app.listen(port, () => {
    logger.trace(`listening on port ${port}`)
})

process.on('uncaughtException', (err) => {
    // log the exception
    logger.fatal(err, 'uncaught exception detected');
    // shutdown the server gracefully
    app.close(() => {
      process.exit(1); // then exit
    });
  
    // If a graceful shutdown is not achieved after 1 second,
    // shut down the process completely
    setTimeout(() => {
      process.abort(); // exit immediately and generate a core dump file
    }, 1000).unref()
    process.exit(1);
  });

start()