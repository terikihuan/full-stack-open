import React from "react";
import { HealthCheckRating } from "../../types";
import startCase from "lodash/startCase";

// MUI components
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Prop {
  states: {
    rating: string;
  };
  setters: {
    setRating: React.Dispatch<React.SetStateAction<string>>;
  };
}

const SubFormHealthCheck = (prop: Prop) => {
  const { rating } = prop.states;
  const { setRating } = prop.setters;

  // console.log(rating);
  // console.log(HealthCheckRating[rating as keyof typeof HealthCheckRating]);

  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <InputLabel htmlFor="entry-rating" shrink={true}>
        Health check rating
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="entry-rating"
        value={rating}
        label="Age"
        onChange={(e) => setRating(e.target.value)}
      >
        {Object.values(HealthCheckRating).map((v) => {
          if (isNaN(Number(v))) {
            const r = typeof v !== "string" ? v.toString() : v;
            return (
              <MenuItem key={v} value={v}>
                {startCase(r)}
              </MenuItem>
            );
          }
        })}
      </Select>
    </FormControl>
  );
};

export default SubFormHealthCheck;
