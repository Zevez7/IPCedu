import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import TitleHeader from "../../titleHeader/TitleHeader";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <TitleHeader title="COVID-19 Infection Control Education" />
      <Box align="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/courses"
        >
          VIEW COURSES
        </Button>
      </Box>

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
