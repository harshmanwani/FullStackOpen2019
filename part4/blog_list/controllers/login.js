const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({username: body.username})
    const correctPassword = user === null ? false : bcrypt.compareSync(body.password,user.passwordHash)
    if(!(user && correctPassword)) {
        return response.status(400).json({error: 'invalid user name or password'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    
    const token = jwt.sign(userForToken,config.SECRET)

    response.status(200).send({token: token, username: user.username, name: user.name})
})

module.exports = loginRouter