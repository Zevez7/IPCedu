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
    </>
  );
};

export default About;
