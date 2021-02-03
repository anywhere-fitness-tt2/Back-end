const request = require('supertest')
const db = require('../../database/dbConfig')
const server = require('../server')
const Classes = require('../classes/class-model')

const juan = {username: 'juan', email: 'email@email.com', password: '123', role: 'instructor'}
const newClass = {        
    name: "New Class",
    type: "dance",
    time: "8:00 am",
    duration: "1hr",
    intensityLvl: "extreme",
    location: "Houston, Tx",
    attendees: 2,
    maxSize: 10}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
  
beforeEach(async () => {
  await db('classes').truncate()
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('sanity check', () => { 
  test('sanity', () => {
    expect(true).toBe(true)
  })
})

describe('Class tests', () => {
    describe('GET classes', () => {
        it('gets all classes', async () => {
            const result = await Classes.getClasses()
            expect(result).toHaveLength(2)
        })
    })
    describe('GET classes by id', () => {
        it('gets class by id', async () => {
            const result = await Classes.getClassById(1)
            expect(result.name).toMatch(/blastin/i)
        })
    })
    describe('GET class attendees', () => {
        it('gets attendees', async () => {
            const result = await Classes.getClassAttendees(1)
            expect(result).toHaveLength(2)
        })
    })
    describe('GET class instructors', () => {
        it('gets instructors', async () => {
            const result = await Classes.getClassInstructors(2)
            expect(result).toEqual([{name: "Do You Even Lift?", username: "Michael Bay"}])
        })
    })
    describe('POST class instructors', () => {
        it('adds new class', async () => {
            await request(server).post('/api/auth/register').send(juan)
            let res = await request(server).post('/api/auth/login').send(juan)
            const token = res.body.token
            let body = await request(server).post('/api/classes/',).set("Authorization", token).send(newClass)
            expect(JSON.stringify(body)).toEqual(expect.stringMatching(/new class/i))
        })
    })
    describe('PUT updates class', () => {
        it('updates class', async () => {
            await request(server).post('/api/auth/register').send(juan)
            let res = await request(server).post('/api/auth/login').send(juan)
            const token = res.body.token
            let body = await request(server).put('/api/classes/1',).set("Authorization", token).send({name: 'updated class name'})
            expect(JSON.stringify(body)).toEqual(expect.stringMatching(/updated class name/i))
        })
    })
    describe('DELETE deletes class', () => {
        it('updates class', async () => {
            await request(server).post('/api/auth/register').send(juan)
            let res = await request(server).post('/api/auth/login').send(juan)
            const token = res.body.token
            let body = await request(server).delete('/api/classes/1',).set("Authorization", token)
            expect(JSON.stringify(body)).toEqual(expect.stringMatching(/removed/i))
        })
    })
})