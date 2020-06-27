import React from "react";
import { Box, Typography } from "@material-ui/core";
import Divider from "../others/Divider";

const TitleHeader = ({ title }) => {
  return (
    <div>
      <Box align="center">
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Divider />
    </div>
  );
};

export default TitleHeader;
