import handleMentions from "../social-interaction/handleMention.mjs";
import { expect } from "chai";
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
    "text": "@micro365 hello",
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
  }}



describe("Testing handleMentions responses", async function(){

    it("1. handleMentions() returns code MEDICAL when text = '@micro365 hysterectomy'", async function(){
        sampleBody.note.text = "@micro365 hysterectomy"
        const result = await handleMentions(sampleBody)
        expect(result.code).to.equal("MEDICAL")
        //done()
    })
    it("2. handleMentions() returns code BLOCKLIST when text = '@micro365 knockers'", async function(){
        sampleBody.note.text = "@micro365 knockers"
        const result = await handleMentions(sampleBody)
        expect(result.code).to.equal("BLOCKLIST")
        //done()
    })
    it("3. handleMentions() returns code RARITY when text = '@micro365 the'", async function(){
        sampleBody.note.text = "@micro365 the"
        const result = await handleMentions(sampleBody)
        expect(result.code).to.equal("RARITY")
        //done()
    })
    it("4. handleMentions() returns code INBUFFER when text = '@micro365 incapacity'", async function(){
        sampleBody.note.text = "@micro365 incapacity"
        const result = await handleMentions(sampleBody)
        expect(result.code).to.equal("INBUFFER")
        //done()
    })
    it("5. handleMentions() returns code NOTREAL when text = '@micro365 embiggensly'", async function(){
        sampleBody.note.text = "@micro365 embiggensly"
        const result = await handleMentions(sampleBody)
        expect(result.code).to.equal("NOTREAL")
        //done()
    })
    it("5.1 handleMentions() returns code NOTREAL when text = '@micro365 uydwgqi'", async function(){
        sampleBody.note.text = "@micro365 uydwgqi"
        const result = await handleMentions(sampleBody)
        expect(result.code).to.equal("NOTREAL")
        //done()
    })

    it("6. handleMentions() returns code NOTONEWORD when text = '@micro365 apple banana'", async function(){
        sampleBody.note.text = "@micro365 apple apple"
        const result = await handleMentions(sampleBody)
        expect(result.code).to.equal("NOTONEWORD")
        //done()
    })
    it("7. handleMentions() returns code OK when text = '@micro365 howler'", async function(){
        sampleBody.note.text = "@micro365 howler"
        const result = await handleMentions(sampleBody)
        expect(result.code).to.equal("OK")
        //done()
    })
    it("8. handleMentions() returns code PUBLISHED when text = '@micro365 nudism'", async function(){
      sampleBody.note.text = "@micro365 nudism"
      const result = await handleMentions(sampleBody)
      expect(result.code).to.equal("PUBLISHED")
      //done()
  })
  it("9. handleMentions() returns code NOCW when cw = ''", async function(){
    sampleBody.note.cw = ""
    const result = await handleMentions(sampleBody)
    expect(result.code).to.equal("NOCW")
    //done()
})



    
})


