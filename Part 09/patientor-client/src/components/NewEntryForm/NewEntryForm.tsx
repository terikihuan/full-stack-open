import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  EntryType,
  DiagnosesHashMap,
  Diagnosis,
  HealthCheckRating,
  Patient,
  EntryWithoutId
} from "../../types";
import startCase from "lodash/startCase";
import assertNever from "../../utils/assertNever";
import patientService from "../../services/patients";

// Components
import SubFormHealthCheck from "./SubFormHealthCheck";
import SubFormHospital from "./SubFormHospital";
import SubFormOccupational from "./SubFormOccupational";

// MUI components
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

interface SubFormProp {
  type: EntryType;
  states: {
    rating: string;
    employer: string;
    startDate: string;
    endDate: string;
    dischargeDate: string;
    criteria: string;
  };
  setters: {
    setRating: React.Dispatch<React.SetStateAction<string>>;
    setEmployer: React.Dispatch<React.SetStateAction<string>>;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
    setCriteria: React.Dispatch<React.SetStateAction<string>>;
  };
}

const SubForm = (prop: SubFormProp) => {
  const { rating, employer, startDate, endDate, dischargeDate, criteria } =
    prop.states;
  const {
    setRating,
    setEmployer,
    setStartDate,
    setEndDate,
    setDischargeDate,
    setCriteria
  } = prop.setters;
  switch (prop.type) {
    case EntryType.HealthCheck:
      return <SubFormHealthCheck states={{ rating }} setters={{ setRating }} />;
    case EntryType.OccupationalHealthcare:
      return (
        <SubFormOccupational
          states={{ employer, startDate, endDate }}
          setters={{ setEmployer, setStartDate, setEndDate }}
        />
      );
    case EntryType.Hospital:
      return (
        <SubFormHospital
          states={{ dischargeDate, criteria }}
          setters={{ setDischargeDate, setCriteria }}
        />
      );
    default:
      assertNever(prop.type);
      return null;
  }
};

interface EntryFormProp {
  diagnoses: DiagnosesHashMap;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const NewEntryForm = (prop: EntryFormProp) => {
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const diagnosesList = Object.keys(prop.diagnoses);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis["code"]>>([]);
  const [rating, setRating] = useState("");
  const [employer, setEmployer] = useState("");
  // Sick leave
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Discharge
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const setPatient = prop.setPatient;
  const { id } = useParams();

  const resetFields = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnoses([]);
    setRating("");
    setEmployer("");
    setStartDate("");
    setEndDate("");
    setDischargeDate("");
    setCriteria("");
  };

  // console.log(id);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!id) {
      return null;
    }

    try {
      switch (type) {
        case EntryType.HealthCheck:
          const newHealthEntry: EntryWithoutId = {
            type,
            description,
            date,
            specialist,
            diagnosisCodes: diagnoses,
            healthCheckRating:
              HealthCheckRating[rating as keyof typeof HealthCheckRating]
          };
          const patientHCData = await patientService.addEntry(
            id,
            newHealthEntry
          );
          setPatient(patientHCData);
          resetFields();
          break;
        case EntryType.OccupationalHealthcare:
          const newOccupationalEntry: EntryWithoutId = {
            type,
            description,
            date,
            specialist,
            diagnosisCodes: diagnoses,
            employerName: employer,
            sickLeave: {
              startDate,
              endDate
            }
          };
          const patientOData = await patientService.addEntry(
            id,
            newOccupationalEntry
          );
          setPatient(patientOData);
          resetFields();
          break;
        case EntryType.Hospital:
          const newHospitalEntry: EntryWithoutId = {
            type,
            description,
            date,
            specialist,
            diagnosisCodes: diagnoses,
            discharge: {
              date: dischargeDate,
              criteria
            }
          };
          const patientHData = await patientService.addEntry(
            id,
            newHospitalEntry
          );
          setPatient(patientHData);
          resetFields();
          break;
        default:
          assertNever(type);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 3,
        "& .MuiTextField-root": { m: 1, width: "25ch" }
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5">New entry</Typography>
      {/* <FormLabel id="entry-type">New entry</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="entry-type"
        name="entry-type"
        value={type}
        onChange={(e) => setType(e.target.value as EntryType)}
      >
        {Object.values(EntryType).map((v) => {
          const t = v.toString();
          return (
            <FormControlLabel
              key={t}
              value={t}
              control={<Radio />}
              label={startCase(t)}
            />
          );
        })}
      </RadioGroup>
      <FormControl id="description" fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="entry-description" shrink={true}>
          Description
        </InputLabel>
        <Input
          required
          id="entry-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl id="date" fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="entry-date" shrink={true}>
          Date
        </InputLabel>
        <Input
          required
          id="entry-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="entry-specialist" shrink={true}>
          Specialist
        </InputLabel>
        <Input
          required
          id="entry-specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
      </FormControl>
      <Autocomplete
        multiple
        id="entry-diagnoses"
        options={diagnosesList}
        getOptionLabel={(option) => option}
        value={diagnoses}
        onChange={(e, newValue) => setDiagnoses(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            InputLabelProps={{ shrink: true }}
            style={{ width: "100%" }}
            variant="standard"
            label="Diagnoses"
            placeholder="Select many"
          />
        )}
      />
      <SubForm
        type={type}
        states={{
          rating,
          employer,
          startDate,
          endDate,
          dischargeDate,
          criteria
        }}
        setters={{
          setRating,
          setEmployer,
          setStartDate,
          setEndDate,
          setDischargeDate,
          setCriteria
        }}
      />
      <Button sx={{ m: 1 }} variant="contained" type="submit">
        ADD
      </Button>
    </Box>
  );
};

export default NewEntryForm;
