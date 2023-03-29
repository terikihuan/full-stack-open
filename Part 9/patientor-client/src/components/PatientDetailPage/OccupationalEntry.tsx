import React from "react";

// MUI Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BusinessIcon from "@mui/icons-material/Business";
import { OccupationalHealthcareEntry, DiagnosesHashMap } from "../../types";

interface EntryProp {
  entry: OccupationalHealthcareEntry;
  diagnoses: DiagnosesHashMap;
}

const OccupationalEntry = (prop: EntryProp) => {
  const { entry } = prop;
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {entry.date}
          <BusinessIcon />
          {entry.employerName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          {entry.description}
        </Typography>
        <ul>
          {entry.diagnosisCodes &&
            entry.diagnosisCodes.map((d) => (
              <li key={d}>
                {d} {prop.diagnoses[d].name}
              </li>
            ))}
        </ul>
        <Typography variant="body2" sx={{ mt: 1.5 }} color="text.secondary">
          diagnosed by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OccupationalEntry;
