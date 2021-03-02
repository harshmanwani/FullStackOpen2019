const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const promise = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(promise)
})

blogsRouter.post('/', async (request, response) => {


  const decodedToken = jwt.decode(request.token, config.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!request.body.title) return response.status(400).end()
  if (!request.body.url) return response.status(400).end()

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
  })
  const promise = await blog.save()
  user.blogs = user.blogs.concat(promise._id)
  await user.save()
  response.status(201).json(promise)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(400).end()
  }
  const decodedToken = jwt.decode(request.token, config.SECRET)
  if (!request.token || !decodedToken.id || decodedToken.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)
  user.blogs.splice(user.blogs.indexOf(blog._id), 1)
  await user.save()
  blog.deleteOne()
  response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  const id = request.params.id
  const promise = await Blog.findByIdAndUpdate(id, { likes: request.body.likes }, { new: true })
  promise ? response.json(promise) : response.status(404).end()
})

module.exports = blogsRouter