import React from "react";
import { Box, Typography } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import Divider from "../../others/Divider";

// const useStyles = makeStyles({});

const About = () => {
  // const classes = useStyles();

  return (
    <>
      <Box align="center">
        <Typography variant="h4">ABOUT</Typography>
      </Box>
      <Divider />
      <Box mt={2}>
        <Typography variant="h5">Mission & Goal</Typography>
        <Typography>
          The project's goal is to provide high quality and up-to-date infection
          control education for healthcare workers and essential works in
          Hillsborough County. The project will also help infection control
          education coordinators better manage their workforce's education.
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h5">Scientific Accuracy</Typography>
        <Typography>
          All information has been reviewed by University of South Florida
          healthcare professionals in infection control, infectious disease and
          public health.
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h5">National and Local Guideline</Typography>
        <Typography>
          The majority of the information are sourced from peer reviewed
          scientific articles, CDC guidelines, and APIC guidelines. Local
          guidelines come from Florida State Health Department and Hillsborough
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
