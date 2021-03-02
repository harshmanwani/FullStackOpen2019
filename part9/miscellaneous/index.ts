import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {exerciseCalculator} from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!').end();
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.json({error: 'malformatted parameters'}).status(400).end();
  }
  const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));
  return res.json({
    weight,
    height,
    bmi,
  }).end();
});

app.post('/exercises', (req, res) => {
  const {dailyExercises, target} = req.body; //eslint-disable-line
  if(!(dailyExercises instanceof Array) || !(typeof target === 'number')) {
    return res.status(400).json({error: 'parameters missing'});
  }
  if(dailyExercises.reduce((prev: boolean, cur) => prev || isNaN(Number(cur)),false)) {
    return res.status(400).json({error: 'malformatted parameters'});
  }
  return res.json(exerciseCalculator(dailyExercises, target)).end();
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
