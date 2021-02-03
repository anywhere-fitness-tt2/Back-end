const request = require('supertest')
const db = require('../../database/dbConfig')
const server = require('../server')

const juan = {username: 'juan', email: 'email@email.com', password: '123', role: 'student'}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
  
beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

describe('sanity check', () => { 
  test('sanity', () => {
    expect(true).toBe(true)
  })
})


describe('Auth tests', () => {
  
  describe('POST /register', () => {
    it('responds with new user', async () => {
      let res = await request(server).post('/api/auth/register').send(juan)
      expect(res.body).toMatchObject({userId: 1})
    })
    it('returns error message', async () => {
      await request(server).post('/api/auth/register').send(juan)
      const {body} = await request(server).post('/api/auth/register').send(juan)
      expect(JSON.stringify(body)).toEqual(expect.stringMatching(/exists/i))
    })
  })
  describe('POST /login', () => {
    it('responds with user info and token', async () => {
      let res = await request(server).post('/api/auth/login').send(juan)
      expect(res.body.token && res.body.user).toExist
    })
    it('responds with invalid credentials', async () => {
      let res = await request(server).post('/api/auth/login').send(juan)
      expect(res.body.message).toMatch(/invalid/i)
    })
  })
})