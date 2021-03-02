const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URL

console.log(`connecting to ${url}`)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log('connected to mongodb!')
    })
    .catch(error => {
        console.log(`error connecting to mongodb: ${error.message}`)
    })

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8 
    },
    id: Number
}, {
    autoIndex: false
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform:  (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

Person.createIndexes()

module.exports = Person