import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({addAnecdote, setNotification}) => {

    const create = async (event) => {
        event.preventDefault()
        const description = event.target.description.value
        event.target.description.value = ''
        addAnecdote(description)
        setNotification(`you created '${description}'`, 5)
    }

    return (
    <>
        <h2>create new</h2>
        <form onSubmit={create}>
            <div><input name='description'/></div>
            <button>create</button>
        </form>
    </>)
}

const mapDispatchToState = {
    addAnecdote,
    setNotification
}

export default connect(null, mapDispatchToState)(AnecdoteForm)