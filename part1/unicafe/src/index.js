import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad;

  const getAverage = () => (good - bad) / all;
  const getPositive = () => (good / all) * 100;

  if ((good || bad || neutral) !== 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <div>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>All: {all}</p>
          <p>Average: {getAverage() || 0}</p>
          <p>Positive: {getPositive() || 0}</p>
        </div>
      </div>
    )
  }

  return <div>No Feedback Given!</div>
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback!</h2>
      <div>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

