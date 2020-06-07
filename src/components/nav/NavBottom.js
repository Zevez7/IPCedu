import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";
import ListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderTop: "1px solid #3F51B5",
    position: "fixed",
    bottom: 0,
  },
});

function SimpleBottomNavigation({ user }) {
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

      <BottomNavigationAction
        component={Link}
        to="/courses"
        label="Courses"
        icon={<ListBulletedIcon />}
      />

      {!user.email ? (
        <BottomNavigationAction
          component={Link}
          to="/about"
          label="About"
          icon={<InfoIcon />}
        />
      ) : null}

      {user.email ? (
        <BottomNavigationAction
          component={Link}
          to="/account"
          label="Account"
          icon={<SettingsIcon />}
        />
      ) : null}
    </BottomNavigation>
  );
}

const mapStateToProps = (state) => ({
  user: state.userData,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleBottomNavigation);
