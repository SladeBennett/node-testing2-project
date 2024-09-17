const db = require('../data/db-config')

async function createBug(bug){
    const [id] = await db('bugs').insert(bug)
    return db('bugs').where('bug_id', id).first()
}

async function deleteBug(id){
    const bug = await db('bugs').where('bug_id', id).first()
    await db('bugs').where('bug_id', id).del()
    return bug
}

module.exports = {
    createBug,
    deleteBug,
}