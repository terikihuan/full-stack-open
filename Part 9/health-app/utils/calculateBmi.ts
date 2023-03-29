const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / ((height / 100) ** 2)
  if (bmi < 18.5) return "Underweight"
  else if (bmi < 25) return "Normal weight"
  else if (bmi < 30) return "Overweight"
  else if (bmi < 35) return "Moderately obese"
  else if (bmi < 40) return "Severely obese"
  else return "Very severely obese"
}

export default calculateBmi