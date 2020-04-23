import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

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
  toolbar: {},
  button: {
    backgroundColor: "#1976D2",
    color: "inherit",
  },
}));

const Nav = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Button className={classes.button} component={RouterLink} to="/">
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
            Infection Control EDU
          </Typography>

          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </Button>
    </AppBar>
  );
};

export default Nav;
