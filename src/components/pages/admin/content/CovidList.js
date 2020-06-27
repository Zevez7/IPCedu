import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  boxContainer: {
    padding: 10,
  },
  covidList: {
    paddingLeft: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 5,
  },
});
const AdminContentCovidList = ({ covidList }) => {
  const classes = useStyles();

  const covidListMap =
    covidList.unit &&
    Object.values(covidList.unit).map((item) => (
      <div key={item.info}>
        Unit: {item.num} - Info: {item.info}
      </div>
    ));

  console.log("covidListMap", covidListMap);

  return (
    <Paper className={classes.boxContainer} elevation={3}>
      <Typography variant="h6">CovidList</Typography>
      <Typography>Info: {covidList.info}</Typography>
      <Typography>Title: {covidList.title}</Typography>
      <Typography>Topic: {covidList.topic}</Typography>
      <div className={classes.covidList}>{covidListMap}</div>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/covidlistedit"
        size="small"
        className={classes.button}
      >
        Edit CovidList
      </Button>
    </Paper>
  );
};

export default AdminContentCovidList;
