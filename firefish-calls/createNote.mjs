import { apiKey } from './API.mjs'
import logger from '../logger.mjs'
//JUST FOR USE IN LOCAL ENVIRONMENT
import { Agent, setGlobalDispatcher } from 'undici'
const agent = new Agent({
  connect: {
    rejectUnauthorized: false
  }
})
setGlobalDispatcher(agent)
//^^^JUST FOR USE IN LOCAL ENVIRONMENT^^^


export default async function createNote(text) {
  const childLogger = logger.child({text})
  childLogger.trace("createNote called")
  const url = 'http://localhost:3000/api/notes/create'
  const params = {
    text: text,
  }
  const headers = {
    "Authorization": "Bearer " + apiKey,
    "Content-type": "application/json; charset=UTF-8"
  }
  return await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  
  
  })
    .then(res => {
      return res.json()
    })
    .then(data => {
      childLogger.trace(data, "note created successfully")
      return data
    })
    .catch(error =>{
      throw error
    })
}










