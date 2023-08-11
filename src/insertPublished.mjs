import { db } from "./db.mjs"
import { isoDate } from "./utilities.mjs"
import logger from "./logger.mjs"
const sampleRes = {
    createdNote: {
      id: '9i8urek4jtzhmtuh',
      createdAt: '2023-08-10T15:02:35.380Z',
      userId: '9i5z5o9zy11l3skl',
      user: {
        id: '9i5z5o9zy11l3skl',
        name: null,
        username: 'micro365',
        host: null,
        avatarUrl: 'https://localhost:3000/files/thumbnail-4e0e8b82-df72-48f7-8100-b7515173da9d',
        avatarBlurhash: 'ySPjGct7xu%M-;xu-;%MRjWBoffQofWB~qRjRjayRjfQM{M{t7ofWBt7ayfQ~qj[WBj[M{WBof?bofayfQM{WBfQt7xuofWBofofM{',
        avatarColor: null,
        isLocked: false,
        speakAsCat: true,
        emojis: [],
        onlineStatus: 'active',
        driveCapacityOverrideMb: null
      },
      text: "Today's #micro365 prompt is:\n" +
        '<small><small><small># </small></small></small>$[x2 $[font.serif **marmalade**]]\n' +
        '/mˈɑːmɐlˌe‍ɪd/\n' +
        '<small>**noun**:\n' +
        '- A kind of jam made with citrus fruit, distinguished by being made slightly bitter by the addition of the peel and by partial caramelisation during manufacture. Most commonly made with Seville oranges, and usually qualified by the name of the fruit when made with other types of fruit.\n' +
        '- A kind of jam made with citrus fruit, distinguished by being made slightly bitter by the addition of the peel and by partial caramelisation during manufacture. Most commonly made with Seville oranges, and usually qualified by the name of the fruit when made with other types of fruit. Ellipsis of orange marmalade.\n' +
        '- quince jam\n' +
        '**verb**:\n' +
        '- To spread marmalade on.\n' +
        '</small>#writing #microfiction #vss #marmalade',
      cw: null,
      visibility: 'public',
      renoteCount: 0,
      repliesCount: 0,
      reactions: {},
      reactionEmojis: [],
      emojis: [],
      tags: [ 'micro365', 'writing', 'microfiction', 'vss', 'marmalade' ],
      fileIds: [],
      files: [],
      replyId: null,
      renoteId: null
    }
  }

export default async function insertPublished(res, word){
  const childLogger = logger.child({res,word})
  childLogger.trace("insertPublished called")
    return db('published')
    .insert({
        id: res.createdNote.id,
        word,
        date: isoDate(sampleRes.createdNote.createdAt)
    })
    .then(res => {
        return res
    })
    .catch(error => {
        return error
    })  
}
//console.log(await insertPublished(sampleRes,'marmalade'))