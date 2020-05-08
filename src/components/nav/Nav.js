import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../redux/action/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    color: "white",
  },
}));

const Nav = ({ user, logOut }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h5" align="center" className={classes.title}>
          Infection Control Edu
        </Typography>

        {user.displayName ? (
          <Button
            className={classes.button}
            onClick={() => logOut()}
            component={RouterLink}
            to="/"
            size="small"
          >
            Logout
          </Button>
        ) : (
          <Button className={classes.button} component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({ user: state.userData });

const mapDispatchToProps = { logOut };

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
