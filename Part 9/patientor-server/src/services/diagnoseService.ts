import { Diagnosis } from "../type";
import diagnoseData from "../data/diagnoses";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoseData;
};

const diagnoseService = {
  getDiagnoses,
};

export default diagnoseService;
