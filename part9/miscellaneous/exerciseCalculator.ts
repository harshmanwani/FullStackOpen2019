export {};

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

interface RatingValues {
    days: Array<number>,
    target: number
}

const parseArguments = (args: Array<string>): RatingValues => {
  if (args.length < 4) {
    throw new Error('Not enough arguments.');
  }
  if (!args.slice(2).reduce((prev, cur) => prev || isNaN(Number(cur)), false)) {
    return {
      days: args.slice(3).map((d) => Number(d)),
      target: Number(args[2]),
    };
  } else {
    throw new Error('All arguments must be numbers.');
  }
};

const descriptions = ['Nahhh fam.', 'It\'s aight.', 'LETTSSSSSS GOOO!'];

const calculateRating = (average: number, target: number): 1 | 2 | 3 => {
  const x = average/target;
  if (x < 0.75) {
    return 1;
  } else if (x < 1.25) {
    return 2;
  } else {
    return 3;
  }
};

export const exerciseCalculator = (days: Array<number>, target: number): Result => {
  const average = days.reduce((prev, cur) => prev+cur, 0)/days.length;
  const rating = calculateRating(average, target);
  return {
    periodLength: days.length,
    trainingDays: days.filter((d) => d !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: descriptions[rating-1],
    target: target,
    average: average,
  };
};

try {
  const {days, target} = parseArguments(process.argv);
  console.log(exerciseCalculator(days, target));
} catch (e) {
  if(e instanceof Error) {
    console.log(e.message);
  }
}
