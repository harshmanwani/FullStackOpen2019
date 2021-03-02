const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const config = require('./utils/config')
const pubsub = new PubSub()
let gru = 0

console.log(`[MONGO] Connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
  .then(() => {
    console.log(`[MONGO] Connected to ${config.MONGODB_URI}`)
  })
  .catch(error => {
    console.log(`[MONGO] Error connecting to MongoDB: ${error.message}`)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(title: String! author: String! published: Int! genres:[String!]!): Book!
    editAuthor(name: String! setBornTo: Int!): Author
    createUser(username: String! favoriteGenre: String!): User
    login(username: String! password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  } 
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      filter = args.genre ? Object.assign({genres: {$in : args.genre}}) : filter
      let foundBooks = await Book.find(filter).populate('author')
      if(args.author) {
        return foundBooks.filter(b => b.author.name === args.author)
      } else {
        return foundBooks
      }
    },
    allAuthors: () => Author.find({}),
    me: (root,args,context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser) throw new AuthenticationError('not authorized')
      const author = await Author.findOne({name: args.author})
      if(!author) {
        try {
          const newAuthor = new Author({name: args.author, bookCount: 1})
          const addedAuthor = await newAuthor.save()
          const newBook = new Book({...args, author: addedAuthor._id})
          const addedBook = await newBook.save()
          const addedBookWithAuthor = await Book.findById(addedBook._id).populate('author')
          pubsub.publish('BOOK_ADDED', {bookAdded: addedBookWithAuthor})
          return addedBookWithAuthor
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      } else {
        try {
          const newBook = new Book({...args, author: author._id})
          const addedBook = await newBook.save()
          author.bookCount = author.bookCount + 1
          author.save()
          const addedBookWithAuthor = await Book.findById(addedBook.id).populate('author')
          pubsub.publish('BOOK_ADDED', {bookAdded: addedBookWithAuthor})
          return addedBookWithAuthor
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser) throw new AuthenticationError('not authorized')
      const author = await Author.findOne({name: args.name})
      if(author) {
        author.born = args.setBornTo
        return author.save()
      } else {
        return null
      }
    },
    createUser: (root, args) => {
      const newUser = new User({...args})
      try {
        return newUser.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if(!user || args.password !== 'secretxD') {
        throw new UserInputError('Invalid username or password.')
      }
      const token = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(token,config.SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser, auth}
    }
    return {auth}
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`[APOLLO] Server ready at ${url}`)
  console.log(`[APOLLO] Subscriptions ready at ${subscriptionsUrl}`)
})
