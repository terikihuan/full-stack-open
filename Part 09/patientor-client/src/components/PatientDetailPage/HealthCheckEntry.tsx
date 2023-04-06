import React from "react";

// MUI Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  HealthCheckEntry as HealthCheckEntryType,
  DiagnosesHashMap
} from "../../types";

const healthRatingColor = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red"
};

interface EntryProp {
  entry: HealthCheckEntryType;
  diagnoses: DiagnosesHashMap;
}

const HealthCheckEntry = (prop: EntryProp) => {
  const { entry } = prop;
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {entry.date}
          <TroubleshootIcon />
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          {entry.description}
        </Typography>
        <Typography component="div">
          <FavoriteIcon
            sx={{ color: healthRatingColor[entry.healthCheckRating] }}
          />
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

export default HealthCheckEntry;
