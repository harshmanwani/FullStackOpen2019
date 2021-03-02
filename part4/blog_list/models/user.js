const mongoose = require('mongoose')
const uniqVal = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      unique: true,
      minlength: 3,
      required: true
  },
  name: String,
  passwordHash: String,
  blogs: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
      }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqVal)

const User = mongoose.model('User', userSchema)

module.exports = User