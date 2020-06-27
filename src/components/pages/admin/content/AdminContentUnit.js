import React from "react";
import { Typography, Paper, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AdminContentUnitSlide from "./AdminContentUnitSlide";
import { deleteUnit } from "../../../redux/action/adminAction";
import { useDispatch } from "react-redux";
import AlertDialog from "../../../others/AlertDialog";
import { Link as RouterLink } from "react-router-dom";
import TitleHeader from "../../../titleHeader/TitleHeader";

const useStyles = makeStyles({
  covidList: {
    paddingLeft: 10,
  },
  unitContainer: {
    padding: 10,
    marginBottom: 30,
  },
  button: {
    marginRight: 10,
  },
});

const slideMap = (array) => {
  return array.map((item, index) => (
    <Box mt={3} key={index}>
      Slide #{index + 1}
      <AdminContentUnitSlide content={item.content} list={item.list} />
    </Box>
  ));
};

const AdminContentUnit = ({ allUnitList }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const allUnitListMap =
    allUnitList.length &&
    allUnitList.map((item, index) => (
      <Paper className={classes.unitContainer} elevation={3} key={item.unit}>
        <Typography>Info: {item.info}</Typography>
        <Typography>Title: {item.title}</Typography>
        <Typography>Date: {item.date}</Typography>
        <Typography>Topic: {item.topic}</Typography>
        <Typography>Unit: {item.unit}</Typography>
        <Button
          color="primary"
          variant="outlined"
          size="small"
          className={classes.button}
        >
          Edit
        </Button>

        <AlertDialog
          alertButtonText="DELETE"
          alertDialogTitle="CONFIRM DELETE"
          alertDialogDescription="Are you sure you want to delete this unit?"
          handleCancelButtonText="Cancel"
          handleConfirmButtonText="Delete"
          className={classes.button}
          cancelColor="primary"
          confirmColor="secondary"
          confirmActionFunction={() => {
            dispatch(deleteUnit(item.topic, item.info));
          }}
          size="small"
          buttonColor="secondary"
        />

        {slideMap(item.slide)}
      </Paper>
    ));

  return (
    <Box mt={5}>
      {<TitleHeader title="UNITS" />}
      <Box pb={2}>
        <Button
          variant="outlined"
          color="primary"
          component={RouterLink}
          to="/admincontentunitaddnew"
        >
          Add New Unit
        </Button>
      </Box>
      {allUnitListMap}
    </Box>
  );
};

export default AdminContentUnit;
