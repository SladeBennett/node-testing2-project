const db = require('../data/db-config')

async function createBug(bug){
    const [id] = await db('bugs').insert(bug)
    return db('bugs').where('bug_id', id).first()
}

module.exports = {
    createBug,
}