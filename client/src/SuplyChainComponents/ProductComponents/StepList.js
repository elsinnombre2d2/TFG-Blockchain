import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Card } from "react-bootstrap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Address from "../../Utilities/Address";

function StepList({ steps }) {
  return (
    <Box
    sx={{
      margin:20}}
      >
    <Paper elevation={4} >
      {steps.map((step, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <b>Step {index + 1}:</b>
              <Typography sx={{ color: "text.secondary" }}>
                {step.description}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                <b>Creador</b> <Address replaceByName address={step.creator}></Address>
              </p>
              <p>
                <b>Fecha de creación</b> {step.timestamp}
              </p>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Paper>
    </Box>
  );
}
export default StepList;
