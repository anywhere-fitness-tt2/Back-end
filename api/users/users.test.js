const request = require('supertest')
const db = require('../../database/dbConfig')
const server = require('../server')
const Users = require('../users/users-model')

const juan = {username: 'juan', email: 'email@email.com', password: '123', role: 'instructor'}


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

describe('Users tests', () => {
    describe('GET users', () => {
        it('gets all users', async () => {
            const result = await Users.getUsers()
            expect(result).toHaveLength(6)
        })
    })
    describe('GET users by id', () => {
        it('gets class by id', async () => {
            const result = await Users.getById(1)
            expect(result.username).toMatch(/kevin/i)
        })
    })
    describe('GET user classes', () => {
        it('gets classes by user id', async () => {
            const result = await Users.getUserClasses(2)
            expect(result).toHaveLength(2)
        })
    })
    describe('PUT updates user', () => {
        it('updates users', async () => {
            await request(server).post('/api/auth/register').send(juan)
            let res = await request(server).post('/api/auth/login').send(juan)
            const token = res.body.token
            let body = await request(server).put('/api/users/1',).set("Authorization", token).send({username: 'chicken'})
            expect(JSON.stringify(body)).toEqual(expect.stringMatching(/chicken/i))
        })
    })
    describe('DELETE deletes user', () => {
        it('deletes user', async () => {
            await request(server).post('/api/auth/register').send(juan)
            let res = await request(server).post('/api/auth/login').send(juan)
            const token = res.body.token
            let body = await request(server).delete('/api/users/1',).set("Authorization", token)
            expect(JSON.stringify(body)).toEqual(expect.stringMatching(/kevin/i))
        })
    })
    describe('POST enrolls user to class', () => {
        it('enrolls user', async () => {
            await request(server).post('/api/auth/register').send(juan)
            let res = await request(server).post('/api/auth/login').send(juan)
            const token = res.body.token
            let body = await request(server).post('/api/users/enrollment/',).set("Authorization", token).send({classId: 1})
            expect(JSON.stringify(body)).toEqual(expect.stringMatching(/enrollment succesful/i))
        })
    })
    describe('DELETE unenrolls user', () => {
        it('unenrolls user', async () => {
            await request(server).post('/api/auth/register').send(juan)
            let res = await request(server).post('/api/auth/login').send(juan)
            const token = res.body.token
            let body = await request(server).delete('/api/users/enrollment/8',).set("Authorization", token)
            expect(JSON.stringify(body)).toEqual(expect.stringMatching(/dropped/i))
        })
    })
})