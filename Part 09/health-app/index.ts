import express from "express";
import calculateBmi from "./utils/calculateBmi";
import calculateExercises from "./utils/calculateExercises";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight) {
    return res.status(400).json({error: "malformatted parameters"});
  }
  
  return res.json({
    height,
    weight,
    bmi: calculateBmi(Number(height), Number(weight))
  });
});
app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  
  if (!daily_exercises || !target) {
    return res.status(400).send({
      error: "parameters missing"
    });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }

  const result = calculateExercises(daily_exercises as number[], Number(target));
  return res.send(result);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});