import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Patient, DiagnosesHashMap, Entry } from "../../types";
import assertNever from "../../utils/assertNever";

// Components
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalEntry from "./OccupationalEntry";
import HospitalEntry from "./HospitalEntry";
import NewEntryForm from "./../NewEntryForm";

// MUI icons
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

interface EntryDetailsProp {
  entry: Entry;
  diagnoses: DiagnosesHashMap;
}

const EntryDetails = (prop: EntryDetailsProp) => {
  const { entry, diagnoses } = prop;
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    default:
      assertNever(entry);
      return null;
  }
};

interface PatientDetailPageProp {
  diagnoses: DiagnosesHashMap;
}

const PatientDetailPage = (prop: PatientDetailPageProp) => {
  const { id } = useParams();

  const [patient, setPatient] = useState<Patient | null>(null);

  console.log(prop.diagnoses);

  useEffect(() => {
    const fetchPatientDetail = async (id: string | undefined) => {
      if (typeof id === "string") {
        const patientDetail = await patientService.getOne(id);
        setPatient(patientDetail);
      } else {
        setPatient(null);
      }
    };
    fetchPatientDetail(id);
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name}
        {"  "}
        {patient.gender === "other" ? (
          <TransgenderIcon />
        ) : patient.gender === "male" ? (
          <MaleIcon />
        ) : (
          <FemaleIcon />
        )}
      </h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <NewEntryForm diagnoses={prop.diagnoses} setPatient={setPatient} />
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <EntryDetails key={e.id} entry={e} diagnoses={prop.diagnoses} />
      ))}
    </div>
  );
};

export default PatientDetailPage;
