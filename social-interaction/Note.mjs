import { isMisspelled } from "spellchecker"
import logger from "../logger.mjs"
const sampleNote = {
    "id": "9id213fllx9y189f",
    "createdAt": "2023-08-13T13:37:09.537Z",
    "userId": "9i5z4skgqvv58swy",
    "user": {
      "id": "9i5z4skgqvv58swy",
      "name": null,
      "username": "admin",
      "host": null,
      "avatarUrl": "https://localhost:3000/identicon/9i5z4skgqvv58swy",
      "avatarBlurhash": null,
      "avatarColor": null,
      "isAdmin": true,
      "isLocked": false,
      "speakAsCat": true,
      "emojis": [],
      "onlineStatus": "online",
      "driveCapacityOverrideMb": null
    },
    "text": "@micro365 1",
    "cw": "Today's #micro365 prompt is:",
    "visibility": "public",
    "renoteCount": 0,
    "repliesCount": 0,
    "reactions": {},
    "reactionEmojis": [],
    "emojis": [],
    "tags": [
      "micro365"
    ],
    "fileIds": [],
    "files": [],
    "replyId": "9id1ffugrao33bm4",
    "renoteId": null,
    "mentions": [
      "9i5z5o9zy11l3skl"
    ],
    "reply": {
      "id": "9id1ffugrao33bm4",
      "createdAt": "2023-08-13T13:20:19.192Z",
      "userId": "9i5z5o9zy11l3skl",
      "user": {
        "id": "9i5z5o9zy11l3skl",
        "name": null,
        "username": "micro365",
        "host": null,
        "avatarUrl": "https://localhost:3000/files/thumbnail-4e0e8b82-df72-48f7-8100-b7515173da9d",
        "avatarBlurhash": "ySPjGct7xu%M-;xu-;%MRjWBoffQofWB~qRjRjayRjfQM{M{t7ofWBt7ayfQ~qj[WBj[M{WBof?bofayfQM{WBfQt7xuofWBofofM{",
        "avatarColor": null,
        "isLocked": false,
        "speakAsCat": true,
        "emojis": [],
        "onlineStatus": "active",
        "driveCapacityOverrideMb": null
      },
      "text": "<small><small><small># </small></small></small>$[x2 $[font.serif **nudism**]]\n/njˈuːdɪzəm/\n<small>**noun**:\n- The belief in or practice of going nude in social, nonsexualized and frequently mixed-gender groups specifically in cultures where going nude in the social situation is not the norm.\n</small>#writing #microfiction #vss #nudism",
      "cw": "Today's #micro365 prompt is:",
      "visibility": "public",
      "renoteCount": 0,
      "repliesCount": 0,
      "reactions": {},
      "reactionEmojis": [],
      "emojis": [],
      "tags": [
        "writing",
        "microfiction",
        "vss",
        "nudism",
        "micro365"
      ],
      "fileIds": [],
      "files": [],
      "replyId": null,
      "renoteId": null
    }
  }

export default class {
    constructor(raw){
        this.raw = raw
        logger.trace({id:raw.id},"new note cosntructed!")
    }

#handle = /@[a-z,A-Z,0-9]* /g

get text() {
    return this.raw.text
}

get cleanText() {
    return this.raw.text.replace(this.#handle, "").trim()
}

get mentioned(){
    return this.raw.text.match(this.#handle)
}

get id(){
    return this.raw.id
}

get isSingleWord() {
    return this.cleanText.match(/[a-z]+/ig)?.length===1 
}

get isRealWord(){
    return !isMisspelled(this.cleanText)
}

get author(){
  return this.raw.user.username
}

}