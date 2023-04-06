import React from "react";
import { Entry, DiagnosesHashMap } from "../../types";

// MUI Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface EntryProp {
  entry: Entry;
  diagnoses: DiagnosesHashMap;
}

const HealthEntry = (prop: EntryProp) => {
  const { entry } = prop;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          variant="h6"
          // sx={{ fontSize: 16 }}
          // color="text.secondary"
          gutterBottom
        >
          {entry.date}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          {entry.description}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
        <Typography variant="body2" sx={{ mt: 1.5 }} color="text.secondary">
          diagnosed by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
    // <div>
    //   <p>
    //     {entry.date} {entry.description}
    //   </p>
      // <ul>
      //   {entry.diagnosisCodes &&
      //     entry.diagnosisCodes.map((d) => (
      //       <li key={d}>
      //         {d} {prop.diagnoses[d].name}
      //       </li>
      //     ))}
      // </ul>
    // </div>
  );
};

export default HealthEntry;
