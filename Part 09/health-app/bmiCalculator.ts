const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / ((height / 100) ** 2)
  if (bmi < 18.5) return "Underweight"
  else if (bmi < 25) return "Normal weight"
  else if (bmi < 30) return "Overweight"
  else if (bmi < 35) return "Moderately obese"
  else if (bmi < 40) return "Severely obese"
  else return "Very severely obese"
}

interface bmiInputs {
  height: number
  weight: number
}

const parseArguments = (args: string[]):bmiInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const {height, weight} = parseArguments(process.argv)
console.log(calculateBmi(height, weight));