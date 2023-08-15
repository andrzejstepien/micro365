import logger from "../logger.mjs"
import Note from "./Note.mjs"
import createNote from "../firefish-calls/createNote.mjs"
import { getDatePublished, wordIsAlreadyInBuffer, getAcceptablePrompts, valueExistsInColumn } from "../database-calls/db.mjs"

export default async function handleMentions(body) {
    const note = new Note(body.note)
    if (!note.isSingleWord) {
        createNote("If you're trying to suggest a prompt, please message me a with *single word*.",note.id)
        return { code: "NOTONEWORD" }
    }
    const word = note.cleanText
    if (await valueExistsInColumn('bad_words', 'word', word)) {
        createNote("That word is on my blocklist.",note.id)
        return { code: "BLOCKLIST" }
    }
    const isRealWord = await note.isRealWord
    if (!isRealWord) {
        createNote(`I'm afraid I can't do that, ${note.author}. That's not a 'real' word, at least as far as I'm aware! Have you checked the spelling? 
        You might just be too cool for me.`,note.id)
        return { code: "NOTREAL" }
    }
    if (await wordIsAlreadyInBuffer(word)) {
        createNote(`Believe it or not, somebody has already suggested that! Watch this space!`,note.id)
        return { code: "INBUFFER" }
    }
    let unacceptable = await getAcceptablePrompts(word)
    unacceptable = unacceptable.length===0
    if (unacceptable) {
        if (await valueExistsInColumn('medical_dictionary', 'word', word)) {
            createNote("I'm afraid I can't use any word that appears in my medical dictionary. I know this delivers some false positives, but it was the only way to avoid accidentally triggering people!",note.id)
            return { code: "MEDICAL" }
        }
        
        if(await valueExistsInColumn('published','word',word)){
            let datePublished = await getDatePublished(word)
            datePublished = datePublished[0].date
            createNote(`I already used that prompt on ${datePublished}, actually!`,note.id)
            return {code: "PUBLISHED"}
        }
            createNote(`I'm afraid I can't do that, ${note.author}. The word you've suggested is either too common or too uncommon. Standards must be maintained!`,note.id)
            return { code: "RARITY" }      
    } else {
        createNote(`OK!`,note.id)
        return { code: "OK" }
    }
}
const sampleBody = {
    note: {
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
        "text": "@micro365 bananas",
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
}

