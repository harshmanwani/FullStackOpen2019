import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;

  const getAverage = () => (good - bad) / all;
  const getPositive = () => (good / all) * 100;

  return (
    <div>
      <h2>Give Feedback!</h2>
      <div>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>
      <hr/>
      <h2>Statistics</h2>
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {all}</p>
        <p>Average: {getAverage()}</p>
        <p>Positive: {getPositive()}</p>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

