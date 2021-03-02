const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.post('/', async (request,response) => {
    if (!request.body.password) return response.status(400).json({error: 'Password must be longer or equal to 3 characters.'}) 
    if (request.body.password.length < 3) return response.status(400).json({error: 'Password must be longer or equal to 3 characters.'})
    const salt = bcrypt.genSaltSync(10) 
    const passwordHash = bcrypt.hashSync(request.body.password,salt)
    const user = new User(
        {
            username: request.body.username,
            name: request.body.name,
            passwordHash: passwordHash
        }
    )

    const savedUser = await user.save()
    
    response.json(savedUser)
})

usersRouter.get('/', async(request, response) => {
    const allUsers = await User.find({}).populate('blogs', {user: 0})
    response.json(allUsers)
})

module.exports = usersRouter