import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const updateVotes = () => {
    const currentVotes = [...votes];
    currentVotes[selected] += 1;
    setVotes(currentVotes);
  }

  const maxVotes = Math.max(...votes);
  const getMostVoted = anecdotes[votes.indexOf(maxVotes)];

  return (
    <div className="app">
      <h2>Anecdote Of The Day</h2>
      <p>{anecdotes[selected]}</p>
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={updateVotes}>Vote</button>
        <button onClick={getRandom}>Next Anecdote</button>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        <p>{getMostVoted}</p>
        <div>has {maxVotes} votes</div>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

