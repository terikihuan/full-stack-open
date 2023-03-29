import {
  NonSSNPatient,
  Patient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from "../type";
import patientData from "../data/patients";
import { v1 as uuid } from "uuid";

const getPatients = (): NonSSNPatient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getSinglePatient = (id: string): Patient | null => {
  const patient = patientData.find((p) => p.id === id);
  if (patient) return patient;
  return null;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...patient,
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId) => {
  const patient = patientData.find((p) => p.id === patientId);
  if (!patient) {
    return null;
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  patient.entries = patient.entries.concat(newEntry);
  return patient;
};

const patientService = {
  getSinglePatient,
  getPatients,
  addPatient,
  addEntry,
};

export default patientService;
