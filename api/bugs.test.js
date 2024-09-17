const request = require('supertest')
const db = require('../data/db-config')
const server = require('../server')
const Bug = require('./bugsModel')

const bug1 = { name: 'ant', legnumber: 6 }
const bug2 = { name: 'katydid', legnumber: 6 }

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('bugs').truncate()
})

afterAll(async () => {
    await db.destroy()
})

it('correct env var', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('Bugs model functions', () => {
    describe('create bug', () => {
        it('[1] adds bug to the db', async () => {
            let bugs
            await Bug.createBug(bug1)
            bugs = await db('bugs')
            expect(bugs).toHaveLength(1)

            await Bug.createBug(bug2)
            bugs = await db('bugs')
            expect(bugs).toHaveLength(2)
        })
        it('[2] inserted name and legnumber', async () => {
            const bug = await Bug.createBug(bug1)
            expect(bug).toMatchObject({ bug_id: 1, ...bug })
        })
    })
    describe('[DELETE] / - deletes bug ', () => {
        it('[3] removes bug from db', async () => {
            const [bug_id] = await db('bugs').insert(bug1)
            let bug = await db('bugs').where('bug_id', bug_id).first()
            expect(bug).toBeTruthy()
            await request(server).delete('/bugs/'+ bug_id)
            bug = await db('bugs').where({bug_id}).first()
            expect(bug).toBeFalsy()
        })
        it('[4] responds with the deleted bug', async () => {
            await db('bugs').insert(bug1)
            let bug = await request(server).delete('/bugs/1')
            expect(bug.body).toMatchObject(bug1)
        })
    })
})