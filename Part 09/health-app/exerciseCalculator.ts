interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface exerciseInputs {
  target: number,
  hours: number[]
}

const calculateExercises = (exerciseHours: number[], target: number):Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(h => h > 0).length;
  const average = exerciseHours.reduce((a, b) => a+b, 0) / periodLength;
  const success = average > target;
  const rating = success ? 5 : 1;
  const ratingDescription = success ? "Good!" : "Workout more you lazy ass!";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseExerciseArguments = (args: string[]):exerciseInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  // if (args.length > 4) throw new Error('Too many arguments');
  const hours = args.slice(3).map(h => Number(h));
  const target = Number(args[2]);
  if (isNaN(target)) 
    throw new Error('Provided values were not numbers!');

  hours.forEach(h => {
    if (isNaN(h)) throw new Error('Provided values were not numbers!');
  });

  return {
    target,
    hours
  };
};

const {target, hours} = parseExerciseArguments(process.argv);
console.log(calculateExercises(hours, target));
