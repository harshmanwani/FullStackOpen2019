const express = require('express');
const app = express()

const bodyParser = require('body-parser');
var morgan = require('morgan')

morgan.token('postData', req => JSON.stringify(req.body));

app.use(bodyParser.json());
app.use(morgan(':method :url :response-time ms :postData'));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Node.js</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(entry => entry.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(entry => entry.id !== id);
  res.status(204).end();
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(entry => entry.id))
    : 0
  return maxId + 1;
}

app.post('/api/persons', (req, res) => {
  const body = req.body;
  
  if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'Info Missing'
    })
  }

  if(persons.some(entry => entry.name === body.name)) {
    return res.status(400).json({
      error: 'Name already exists, it should be unique.'
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person);
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  </div>`);
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

let persons = [
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