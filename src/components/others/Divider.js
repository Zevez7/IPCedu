import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  divider: {
    border: "1px solid #3F51B5",
    marginTop: 30,
    marginBottom: 30,
  },
});

const Divider = () => {
  const classes = useStyles();

  return <div className={classes.divider} />;
};

export default Divider;
