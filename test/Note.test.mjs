import Note from "../social-interaction/Note.mjs";
import { testDb as db } from "../database-calls/db.mjs";
import { expect } from "chai";
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
}
const N1 = new Note(db,sampleNote)
describe("Testing Note getters", function () {
  it("1. .text returns a string", function (done) {
    expect(N1.text).to.be.a("string")
    done()
  })
  it("2. .cleanText returns a string", function (done) {
    expect(N1.cleanText).to.be.a("string")
    done()
  })
  it("3. .cleanText contains no @s", function (done) {
    expect(/@/.test(N1.cleanText)).to.equal(false)
    done()
  })
  it("4 .mentioned should be array", function (done) {
    expect(N1.mentioned).to.be.a('array')
    done()
  })
  it("5. .mentioned should have length 4 when text = '@george @paul @ringo @john how about a reunion?'", function (done) {
    N1.raw.text = "@george @paul @ringo @john how about a reunion?"
    expect(N1.mentioned.length).to.equal(4)
    done()
  })
  it("6. .mentioned should have length 2 when text = '@laurel @hardy how about a reunion?'", function (done) {
    N1.raw.text = "@laurel @hardy how about a reunion?"
    expect(N1.mentioned.length).to.equal(2)
    done()
  })
  it("7. isSingleWord should return false when text = '@laurel @hardy how about a reunion?'", function (done) {
    N1.raw.text = "@laurel @hardy how about a reunion?"
    expect(N1.isSingleWord).to.equal(false)
    done()
  })
  it("8. isSingleWord should return true when text = '@laurel @me no'", function (done) {
    N1.raw.text = "@laurel @me no"
    expect(N1.isSingleWord).to.equal(true)
    done()
  })
  it("9. isSingleWord should return true when text = 'word'", function (done) {
    N1.raw.text = "word"
    expect(N1.isSingleWord).to.equal(true)
    done()
  })
  it("10. isRealWord should return true when text = 'word'", async function () {
    N1.raw.text = "word"
    const result = await N1.isRealWord
    expect(result).to.equal(true)
    
  })
  it("11. isRealWord should return false when text = 'embiggensly'", async function () {
    N1.raw.text = "embiggensly"
    const result = await N1.isRealWord
    expect(result).to.equal(false)
    
  })
  it("11.1 isRealWord should return false when text = 'awjfdihfeauigfieau'", async function () {
    N1.raw.text = "awjfdihfeauigfieau"
    const result = await N1.isRealWord
    expect(result).to.equal(false)
    
  })
  it("12. author should return a string", function (done) {
    expect(N1.author).is.a('string')
    done()
  })
  it("13. author should return the string 'admin'", function (done) {
    expect(N1.author).to.equal('admin')
    done()
  })
  it("14. .id should return the string '9id213fllx9y189f'", function (done) {
    expect(N1.id).to.equal('9id213fllx9y189f')
    done()
  })
  it("15. .hasCW should return true", function (done) {
    expect(N1.hasCW).to.equal(true)
    done()
  })
  it("16. .hasCW should return false", function (done) {
    N1.raw.cw = ""
    expect(N1.hasCW).to.equal(false)
    done()
  })

})