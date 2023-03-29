import React from "react";

// MUI components
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

interface Prop {
  states: {
    employer: string;
    startDate: string;
    endDate: string;
  };
  setters: {
    setEmployer: React.Dispatch<React.SetStateAction<string>>;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
  };
}

const SubFormOccupational = (prop: Prop) => {
  const { employer, startDate, endDate } = prop.states;
  const { setEmployer, setStartDate, setEndDate } = prop.setters;

  return (
    <>
      <FormControl id="employer" fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="employer" shrink={true}>
          Employer
        </InputLabel>
        <Input
          required
          id="employer"
          type="text"
          value={employer}
          onChange={(e) => setEmployer(e.target.value)}
        />
      </FormControl>
      <FormLabel sx={{ ml: 1 }} component="legend">
        Sick leave
      </FormLabel>
      <Stack style={{ width: "100%" }} direction="row">
        <TextField
          style={{ width: "100%" }}
          id="standard-basic"
          label="Start date"
          variant="standard"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          style={{ width: "100%" }}
          id="standard-basic"
          label="End date"
          variant="standard"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Stack>

      <Box style={{ width: "100%" }}></Box>
    </>
  );
};

export default SubFormOccupational;
