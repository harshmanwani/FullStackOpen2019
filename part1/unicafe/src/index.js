import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistic = ({ text, value }) => <p>{text}: {value}</p>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const getAverage = () => (good - bad) / all;
  const getPositive = () => `${(good / all) * 100} %`;

  if ((good || bad || neutral) !== 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <div>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={all} />
          <Statistic text="Average" value={getAverage() || 0} />
          <Statistic text="Positive" value={getPositive() || 0} />
        </div>
      </div>
    )
  }

  return <div>No Feedback Given!</div>
}

const Button = ({ type, clickHandler }) => <button onClick={() => clickHandler(type)} >{type}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (type) => {
    switch (type) {
      case 'Good':
        setGood(good + 1);
        break;
      case 'Neutral':
        setNeutral(neutral + 1);
        break;
      case 'Bad':
        setBad(bad + 1);
        break;
    }
  }

  return (
    <div>
      <h2>Give Feedback!</h2>
      <div>
        <Button type="Good" clickHandler={handleFeedback} />
        <Button type="Neutral" clickHandler={handleFeedback} />
        <Button type="Bad" clickHandler={handleFeedback} />
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

