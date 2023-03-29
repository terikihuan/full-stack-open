import {
  Diagnosis,
  EntryWithoutId,
  Entry,
  EntryType,
  SickLeave,
  Discharge,
} from "../type";

import { isString, parseId } from "./toPatient";

// Parsers
// const isInt = (num: unknown): num is number => {
//   return Number.isInteger(num);
// };
const parseHealthCheckRating = (rating: unknown): number => {
  if (!rating || isNaN(Number(rating))) {
    throw new Error("Incorrect or missing rating" + rating);
  }
  return Number(rating);
};
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description" + description);
  }
  return description;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist: " + specialist);
  }
  return specialist;
};
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(param);
};
const parseEntryType = (entryType: unknown): EntryType => {
  if (!isString(entryType) || !isEntryType(entryType)) {
    throw new Error("Incorrect or missing entry type: " + entryType);
  }
  return entryType;
};
const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName: " + employerName);
  }
  return employerName;
};
const parseSickLeave = (period: unknown): SickLeave => {
  if (!period || typeof period !== "object") {
    throw new Error("Incorrect or missing sick leave");
  }
  console.log(period);

  if (
    "startDate" in period &&
    "endDate" in period &&
    isString(period.startDate) &&
    isString(period.endDate)
  ) {
    const sickLeavePeriod = {
      startDate: period.startDate,
      endDate: period.endDate,
    };
    return sickLeavePeriod;
  }
  throw new Error("Incorrect or missing sick leave");
};
const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge");
  }
  if (
    "date" in discharge &&
    "criteria" in discharge &&
    isString(discharge.date) &&
    isString(discharge.criteria)
  ) {
    const dischargeObject = {
      date: discharge.date,
      criteria: discharge.criteria,
    };
    return dischargeObject;
  }
  throw new Error("Incorrect or missing discharge");
};

// Validators
export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object
  ) {
    if (
      parseEntryType(object.type) === EntryType.HealthCheck &&
      "healthCheckRating" in object
    ) {
      const newEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return newEntry;
    } else if (
      parseEntryType(object.type) === EntryType.OccupationalHealthcare &&
      "employerName" in object &&
      "sickLeave" in object
    ) {
      const newEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: EntryType.OccupationalHealthcare,
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
      return newEntry;
    } else if (
      parseEntryType(object.type) === EntryType.Hospital &&
      "discharge" in object
    ) {
      const newEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: EntryType.Hospital,
        discharge: parseDischarge(object.discharge),
      };
      return newEntry;
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("type" in object) {
    if (
      parseEntryType(object.type) === "HealthCheck" &&
      "id" in object &&
      "description" in object &&
      "date" in object &&
      "specialist" in object &&
      "diagnosisCodes" in object &&
      "occupation" in object &&
      "entries" in object
    ) {
      const newEntry: Entry = {
        id: parseId(object.id),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: EntryType.HealthCheck,
      } as Entry;
      return newEntry;
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};
