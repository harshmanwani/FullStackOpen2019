const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const api = supertest(app)

const oneBlog = 
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }

const copyAndPastedListFromGitHubLol = [ 
    { 
    title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7
    }, 
    { 
    title: "Go To Statement Considered Harmful", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
    likes: 5
    }, 
    {
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
    likes: 12
    }, 
    {
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10
    }, 
    {
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0
    }, 
    { 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2
    }
  ]

  const userObject = {
    username: 'root',
    name: 'admin',   
    passwordHash: bcrypt.hashSync('1337',10)
}

beforeEach( async () => {
    await User.deleteMany({})
    const user = new User(userObject)
    const promise = await user.save()
    await Blog.deleteMany({})
    const objectArray = copyAndPastedListFromGitHubLol.map(blog => new Blog({...blog, user: promise._id}))
    const promiseArray = objectArray.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('GET', () => {
    test('... returns array with the same length of predetermined list', async () => {
        const getReq = await api.get('/api/blogs')
        expect(getReq.body).toHaveLength(copyAndPastedListFromGitHubLol.length)
        expect(getReq.type).toBe('application/json')
    })
    test('... returns blogs with an id property', async () => {
        const getReq = await api.get('/api/blogs')
        for(let blog of getReq.body){
            expect(blog.id).toBeDefined()
        }
    })
})

describe('POST', () => {
    test('... returns 401 when user not authorized', async () => {
        const postReq = await api.post('/api/blogs').send(oneBlog)
        expect(postReq.status).toBe(401)
        const getReq = await api.get('/api/blogs')
        expect(getReq.body).toHaveLength(copyAndPastedListFromGitHubLol.length)
    })
    test('... returns 201 when user is authorized', async () => {
        const mongoPromise = await User.findOne({})
        token = jwt.sign({username: mongoPromise.username,id: mongoPromise._id}, config.SECRET)

        const postReq = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(oneBlog)
        expect(postReq.status).toBe(201)
        const getReq = await api.get('/api/blogs')
        expect(getReq.body).toHaveLength(copyAndPastedListFromGitHubLol.length + 1)
    })
    test('... sets likes of a blog to 0 when not specified', async () => {
        const mongoPromise = await User.findOne({})
        token = jwt.sign({username: mongoPromise.username,id: mongoPromise._id}, config.SECRET)

        const noLikes = {...oneBlog}
        delete noLikes.likes
        const postReq = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(noLikes)
        expect(postReq.status).toBe(201)
        expect(postReq.body.likes).toBe(0)
    })
    test('... returns 400 when url or title misses', async () => {
        const mongoPromise = await User.findOne({})
        token = jwt.sign({username: mongoPromise.username,id: mongoPromise._id}, config.SECRET)

        const noTitle = {...oneBlog}
        const noUrl = {...oneBlog}
        delete noTitle.title
        delete noUrl.url
        const postReqMissingTitle = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(noTitle)
        expect(postReqMissingTitle.status).toBe(400)
        const postReqMissingUrl = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(noUrl)
        expect(postReqMissingUrl.status).toBe(400)
    })
})

/*






*/
afterAll(async () => {
    mongoose.connection.close()
})