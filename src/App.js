import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/others/ScrollToTop";
import Home from "./components/pages/home/Home.js";
import Nav from "./components/nav/Nav";
import Login from "./components/pages/login/Login";
import Courses from "./components/pages/courses/Courses";
import NavBottom from "./components/nav/NavBottom";
import Topic from "./components/pages/topic/Topic";
import Slide from "./components/pages/slide/Slide";
import { connect } from "react-redux";
import { auth } from "./components/firebase/Firebase";
import { userData } from "./components/redux/action/index";
import { makeStyles } from "@material-ui/core/styles";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Account from "./components/pages/account/Account";
import { Container } from "@material-ui/core";

// automatic responsive font sizes based on variant
// https://material-ui.com/customization/typography/
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

function App({ userData, user }) {
  const classes = useStyles();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const uid = user.uid;

        userData({ displayName, email, uid });

        //****testing
        console.log("user useffect onAuthStateChange", displayName, email, uid);
      } else {
        //****testing
        console.log("you are signed out");
      }
    });
  }, [userData]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Nav />
        <ScrollToTop>
          <div style={{ height: 30 }}></div>
          <Container className={classes.root}>
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} />} />
              <Route
                exact
                path="/topic/:topic"
                render={(props) => <Topic {...props} />}
              />
              <Route
                exact
                path="/login"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/slide/:topic/:unit"
                render={(props) => <Slide {...props} />}
              />
              <Route
                exact
                path="/account"
                render={(props) => <Account {...props} />}
              />{" "}
              <Route
                exact
                path="/courses"
                render={(props) => <Courses {...props} />}
              />
            </Switch>{" "}
          </Container>
        </ScrollToTop>

        <NavBottom />
      </ThemeProvider>
    </Router>
  );
}

const mapStateToProps = (state) => ({ user: state.userData });

const mapDispatchToProps = {
  userData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
