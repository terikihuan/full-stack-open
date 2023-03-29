import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/toPatient";
import { toNewEntry } from "./../utils/toEntry";

const patientRouter = express.Router();

patientRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getSinglePatient(id);
  if (patient) {
    return res.send(patient);
  }
  return res.status(400).send({
    error: "patient not found",
  });
});

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

patientRouter.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const newEntry = toNewEntry(req.body);
  const updatedPatient = patientService.addEntry(id, newEntry);
  if (updatedPatient) return res.json(updatedPatient);
  return res.status(400).json({
    error: "patient not found",
  });
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
