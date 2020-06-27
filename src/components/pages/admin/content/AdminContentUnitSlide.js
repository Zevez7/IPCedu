import React from "react";
import { Typography, Box } from "@material-ui/core";

const AdminContentUnitSlide = ({ content, list }) => {
  let mapList;
  let DataListArray;

  if (list) {
    DataListArray = list.split(", ");
    mapList = DataListArray.map((item, index) => <li key={index}>{item}</li>);
  }

  return (
    <Box p={1} border={1}>
      <Typography variant="body1">CONTENT:</Typography>
      <Typography>{content}</Typography>
      {list && (
        <>
          <Typography variant="body1">LIST:</Typography>
          <Typography>{mapList}</Typography>
        </>
      )}
    </Box>
  );
};

export default AdminContentUnitSlide;
