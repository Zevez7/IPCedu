import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  divider: {
    border: "1px solid #3F51B5",
    marginTop: 20,
    marginBottom: 30,
  },
});

const About = () => {
  const classes = useStyles();

  return (
    <>
      <Box align="center">
        <Typography variant="h4">ABOUT</Typography>
      </Box>
      <div className={classes.divider} />
      <Box mt={2}>
        <Typography variant="h5">Mission & Goal</Typography>
        <Typography>
          The project's goal is to provide high quality and up-to-date infection
          control education for healthcare workers and essential works in
          Hillsborough County. The project will also help infection control
          education coordinator better manage their workforce's education.
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h5">Scientific Accuracy</Typography>
        <Typography>
          All information on this application has been reviewed by University of
          South Florida healthcare professional in infection control, infectious
          disease and public health.
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h5">National and Local Guideline</Typography>
        <Typography>
          The majority of the information are sourced from peer reviewed
          scientific article, CDC guidelines, and APIC guideline. Local
          guideline comes from Florida State Health Department and Hilsborough
          County Health Department.
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h5">Contact</Typography>
        <Typography>Dat Nguyen, Project Lead</Typography>
        <Typography>Email: Dat7MD@gmail.com</Typography>
      </Box>
    </>
  );
};

export default About;
