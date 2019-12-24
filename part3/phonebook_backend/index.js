const express = require('express');
const app = express()

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Node.js</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons);
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

const persons = [
    {
      name: 'Arto Hellas',
      number: '040-123456',
      id: 1
    },
    {
      name: 'Ada Lovelace',
      number: '39-44-5323523',
      id: 2
    },
    {
      name: 'Dan Abramov',
      number: '12-43-234345',
      id: 3
    },
    {
      name: 'Mary Poppendieck',
      number: '39-23-6423122',
      id: 4
    },
    {
      name: 'check',
      number: '1234',
      id: 5
    },
    {
      name: 'noice',
      number: '99',
      id: 6
    }
  ]