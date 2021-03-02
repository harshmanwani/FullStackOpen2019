require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
// eslint-disable-next-line no-unused-vars
morgan.token('type', (req,res) => JSON.stringify(req.body) )
app.use(morgan(':method :url :status :res[content-length] :response-time ms :type'))

const generateID = () => Math.floor(Math.random() * Math.floor(1000))

app.get('/api/persons', (_req, res, next) => {
    Person.find({})
        .then(persons => {
            res.json(persons)
        })
        .catch(error => {
            next(error)
        })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person){
                res.json(person)
            } else {
                res.status(404).end()
            }  
        })
        .catch(error => {
            next(error)
        })
})

app.get('/info', (_req, res, next) => {
    Person.find({})
        .then(persons => {
            res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${Date()}</p>`)
        })
        .catch(error => {
            next(error)
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person ({
        name: body.name,
        number: body.number,
        id: generateID()
    })

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => {
            next(error)
        })
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body
    Person.findByIdAndUpdate(id, {number: body.number}, {runValidators: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => {
            next(error)
        })
})

const errorHandler = (error, _req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (_req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})