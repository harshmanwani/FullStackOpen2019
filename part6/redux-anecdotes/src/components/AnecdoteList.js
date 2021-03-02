import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({anecdotes, voteAnecdote, setNotification}) => {
    
    const vote = (id) => {
        const anecdote = anecdotes.find(obj => obj.id === id)
        voteAnecdote(id, {...anecdote, votes: anecdote.votes + 1})
        setNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.filter(obj => obj.content.toLowerCase().search(state.filter.toLowerCase()) !== -1)
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)