interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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

export default calculateExercises;