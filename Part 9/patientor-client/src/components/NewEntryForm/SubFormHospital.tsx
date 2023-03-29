import React from "react";

// MUI components
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";

interface Prop {
  states: {
    dischargeDate: string;
    criteria: string;
  };
  setters: {
    setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
    setCriteria: React.Dispatch<React.SetStateAction<string>>;
  };
}

const SubFormHospital = (prop: Prop) => {
  const { dischargeDate, criteria } = prop.states;
  const { setDischargeDate, setCriteria } = prop.setters;

  return (
    <>
      <FormLabel sx={{ ml: 1 }} component="legend">
        Discharge
      </FormLabel>
      <FormControl
        id="discharge-date"
        fullWidth
        sx={{ m: 1 }}
        variant="standard"
      >
        <InputLabel htmlFor="discharge-date" shrink={true}>
          Date
        </InputLabel>
        <Input
          required
          id="discharge-date"
          type="date"
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
        />
      </FormControl>
      <FormControl
        id="discharge-criteria"
        fullWidth
        sx={{ m: 1 }}
        variant="standard"
      >
        <InputLabel htmlFor="discharge-criteria" shrink={true}>
          Criteria
        </InputLabel>
        <Input
          required
          id="discharge-criteria"
          type="text"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
        />
      </FormControl>
    </>
  );
};

export default SubFormHospital;
