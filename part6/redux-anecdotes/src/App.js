import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = ({ initializeAnecdotes }) => {
  useEffect(() => {
    initializeAnecdotes()
  }, [initializeAnecdotes])

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

const mapDispatchToProps = {
  initializeAnecdotes
}

export default connect(null, mapDispatchToProps)(App)