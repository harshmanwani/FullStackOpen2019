const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const api = supertest(app)

const preUsers = [
{
    username: 'LMAOXD',
    name: 'Epstein himself',
    password:'1L1K3CH1LDS'
},
{
    username: 'ClintonHater',
    name: 'Donald J. Trump',
    password:'GrabHerByThePussy'
}
]


beforeEach(async () => {
    await User.deleteMany({})
    const mongoObjects = preUsers.map(user => new User({...user, passwordHash: bcrypt.hashSync(user.password)}))
    const promiseArray = mongoObjects.map(user => user.save())
    await Promise.all(promiseArray)
})
describe('GET', () => {
    test('... returns a array of objects with the length of the predetermined userlist', async() => {
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(preUsers.length)
        expect(response.type).toBe('application/json')
    })
})

describe('POST', () => {
    test('... can also be used to create users and not only to receive bad http status codes', async () => {
        const postReqEverythingGood = await api.post('/api/users').send({username:'AYYYYYYYYY',name:'IAMTHEONEXDDD',password:'j1234jksdf9120589+'})
        expect(postReqEverythingGood.status).toBe(200)
        const getReq = await api.get('/api/users')
        expect(getReq.body.length).toBe(preUsers.length+1)
    })
    describe('... but returns a 400 status code and doesnt create a user',() => {
        test('... when username is missing', async () => {
            const postReqNoUsername = await api.post('/api/users').send({name:'lolllll',password:'123123123'})
            expect(postReqNoUsername.status).toBe(400)
            const getReq = await api.get('/api/users')
            expect(getReq.body.length).toBe(preUsers.length)
        })
        test('... when password is missing', async () => {
            const postReqNoPassword = await api.post('/api/users').send({username:'yesnt',name:'lolllll'})
            expect(postReqNoPassword.status).toBe(400)
            const getReq = await api.get('/api/users')
            expect(getReq.body.length).toBe(preUsers.length)
        })
        test('... when username is too short', async () => {
            const postReqShortUsername = await api.post('/api/users').send({username:'ye',name:'',password:'123123'})
            expect(postReqShortUsername.status).toBe(400)
            const getReq = await api.get('/api/users')
            expect(getReq.body.length).toBe(preUsers.length)
        })
        test('... when password is too short', async () => {
            const postReqShortPassword = await api.post('/api/users').send({username:'yes',name:'',password:'12'})
            expect(postReqShortPassword.status).toBe(400)
            const getReq = await api.get('/api/users')
            expect(getReq.body.length).toBe(preUsers.length)
        })
    })
})
afterAll(() => {
    mongoose.connection.close()
})