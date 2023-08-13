import firefish from './firefish.mjs'
import logger from '../logger.mjs'
// //JUST FOR USE IN LOCAL ENVIRONMENT
// import { Agent, setGlobalDispatcher } from 'undici'
// const agent = new Agent({
//   connect: {
//     rejectUnauthorized: false
//   }
// })
// setGlobalDispatcher(agent)
// //^^^JUST FOR USE IN LOCAL ENVIRONMENT^^^



export default async function createNote(text) {
  logger.trace("createNote called")
  const body = {
    text: text,
    cw:"Today's #micro365 prompt is:"
  }
  try {
    const response = await firefish.post("notes/create",body)
    logger.info({
      status: response.status,
      statusText: response.statusText,
      data: response.data
    })
    return response.data
  } catch (error) {
    throw error
  }
}










