import axios from "axios"

const apiKey = "sdJSmZpT518eOsNJUyiGNKGwjrcsQE1d"

export default axios.create({
    baseURL: "http://localhost:3000/api/",
    //timeout:1000,
    headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-type": "application/json; charset=UTF-8"
      }
})