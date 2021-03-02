import anecdotesService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: { anecdotes }
    })
  }
}

export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    await anecdotesService.update(id, anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: {id}
    })
  }
}

export const addAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(data)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: { newAnecdote }
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE_ANECDOTE':
      return state.map(obj => obj.id === action.data.id ? {...obj, votes: obj.votes+1} : obj)
    case 'ADD_ANECDOTE':
      return state.concat(action.data.newAnecdote)
    case 'INITIALIZE_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

export default anecdoteReducer