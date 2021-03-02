const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const promise = await Blog.find({}).populate('user', {username: 1, name:1}).populate('comments', {blog: 0})
    response.json(promise)
})
  
blogsRouter.post('/', async (request, response) => {
    const decodedToken = jwt.decode(request.token,config.SECRET)
    console.log(decodedToken)
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }

    if(!request.body.title) return response.status(400).end()
    if(!request.body.url) return response.status(400).end()

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id
    })
    console.log(blog)
    
    const promise = await blog.save()

    //this is awful.
    const awfulCrap = await Blog.findById(promise.id).populate('user', {username: 1, name: 1})

    user.blogs = user.blogs.concat(promise._id)
    await user.save()
    response.status(201).json(awfulCrap)
})

blogsRouter.post('/:id/comments', async (request,response) => {
  const id = request.params.id
  if(!request.body.comment) return response.status(400).end()
  const comment = new Comment({
    comment: request.body.comment,
    blog: id
  })
  const promise = await comment.save()
  const blog = await Blog.findById(id)
  blog.comments = blog.comments.concat(promise._id)
  await blog.save()
  response.json(promise)
  // const oldBlog = await Blog.findById(id)
  // if(!oldBlog) return response.status(404).end()
  // const promise = await Blog.findByIdAndUpdate(id, {comments: oldBlog.comments.concat(request.body.comment)}, {new: true})
  // promise ? response.json(promise) : response.status(500).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if(!blog) {
    return response.status(400).end()
  }
  const decodedToken = jwt.decode(request.token,config.SECRET)
  if(!request.token || !decodedToken.id || decodedToken.id.toString() !== blog.user.toString()) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)
  user.blogs.splice(user.blogs.indexOf(blog._id),1)
  await user.save()
  blog.deleteOne()
  response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  const id = request.params.id
  const oldBlog = await Blog.findById(id)
  if(!oldBlog) return response.status(404).end()
  const promise = await Blog.findByIdAndUpdate(id, {likes: oldBlog.likes+=1}, {new: true})
  promise ? response.json(promise) : response.status(500).end()
})

module.exports = blogsRouter