const logger = require('./logger')

const errorHandling = (error,request,response,next) => {
    if(process.env.NODE_ENV !== 'test') {
        logger.error(`[ERROR] ${error}`)
    }  
    
    if(error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if(error.name === 'CastError') {
        return response.status(400).json({error: 'invalid id'})
    }
}

const tokenExtractor = (request,response,next) => {
    const authorization = request.get('authorization')

    if(authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }
    next()
}

module.exports = {errorHandling,tokenExtractor}