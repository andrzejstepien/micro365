import { db } from "./db.mjs";
import { isoDate } from "./utilities.mjs";
export default async function todaysPromptAlreadyPublished() {
    const number = await db('published')
    .count('* as count')
    .where('date', isoDate())
    return number[0].count > 0
}

console.log(await todaysPromptAlreadyPublished())
