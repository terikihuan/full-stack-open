import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis, DiagnosesHashMap } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientDetailPage from "./components/PatientDetailPage/PatientDetailPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [diagnosesHash, setDiagnosesHash] = useState<DiagnosesHashMap>({});

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchDiagnoses();
    void fetchPatientList();
  }, []);

  useEffect(() => {
    if (diagnoses.length > 0 && Object.keys(diagnosesHash).length === 0) {
      const tempHash: DiagnosesHashMap = {};
      diagnoses.forEach((d) => {
        tempHash[d.code] = {
          code: d.code,
          name: d.name,
          latin: d.latin || undefined,
        };
      });
      setDiagnosesHash(tempHash);
    }
  }, [diagnoses]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={<PatientDetailPage diagnoses={diagnosesHash} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
