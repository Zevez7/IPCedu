import React from "react";
import { Box, Typography } from "@material-ui/core";
import Divider from "../../others/Divider";

const Home = () => {
  return (
    <>
      <Box>
        <Typography variant="h4">
          COVID-19 Infection Control Education
        </Typography>
      </Box>
      <Divider />
      <Box mt={4}>
        <Typography>
          Hillsborough County infection control education platform for
          healthcare workers and essential workers.
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography>
          Developed by USF healthcare professionals for workers on the frontline
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography>
          The app provides up-to-date infection control guideline and education
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography>
          Quickly and easily manage infection control education through this app
        </Typography>
      </Box>
    </>
  );
};

export default Home;
