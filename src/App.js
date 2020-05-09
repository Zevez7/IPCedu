import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/others/ScrollToTop";
import Nav from "./components/nav/Nav";
import Login from "./components/pages/login/Login";
import Courses from "./components/pages/courses/Course";
import NavBottom from "./components/nav/NavBottom";
import Slide from "./components/pages/slide/Slide";
import { connect } from "react-redux";
import { fetchUserData } from "./components/redux/action/index";
import { makeStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Account from "./components/pages/account/Account";
import { Container } from "@material-ui/core";
import Home from "./components/pages/home/Home";
import About from './components/pages/about/About';

// automatic responsive font sizes based on variant
// https://material-ui.com/customization/typography/
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 80,
  },
});

function App({ fetchUserData, user, updateCurrentSlide }) {
  const classes = useStyles();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, updateCurrentSlide]);

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
              />
              <Route
                exact
                path="/courses"
                render={(props) => <Courses {...props} />}
              />
              <Route
                exact
                path="/about"
                render={(props) => <About {...props} />}
              />
            </Switch>
          </Container>
        </ScrollToTop>

        <NavBottom />
      </ThemeProvider>
    </Router>
  );
}

const mapStateToProps = (state) => ({ user: state.userData });

const mapDispatchToProps = {
  fetchUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
