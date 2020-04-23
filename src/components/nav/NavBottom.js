import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderTop: "1px solid black",
    position: "fixed",
    bottom: 0,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        console.log(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction label="About" icon={<InfoIcon />} />
      <BottomNavigationAction label="Account" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
}
