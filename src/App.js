import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "./components/others/history";
import ScrollToTop from "./components/others/ScrollToTop";
import Nav from "./components/nav/Nav";
import Login from "./components/pages/login/Login";
import Courses from "./components/pages/courses/Course";
import NavBottom from "./components/nav/NavBottom";
import Slide from "./components/pages/slide/Slide";
import { connect, useDispatch } from "react-redux";
import { fetchUserData } from "./components/redux/action/userAction";
import {
  fetchCoord,
  fetchRole,
  fetchPosition,
  fetchLocation,
} from "./components/redux/action/publicAction";
import { makeStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Account from "./components/pages/account/Account";
import { Container } from "@material-ui/core";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import EditAccount from "./components/pages/account/EditAccount";
import Admin from "./components/pages/admin/Admin";
import AdminEditAccount from "./components/pages/admin/AdminEditAccount";
import Coordinator from "./components/pages/coordinator/Coordinator";

// import "./firebaseui-styling.global.css"; // Import globally.

// automatic responsive font sizes based on variant
// https://material-ui.com/customization/typography/
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  normalLinks: {
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 30,
  },
  adminLink: {
    maxWidth: 2000,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 80,
  },
});

function App({ fetchUserData, user, updateCurrentSlide }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  dispatch(fetchCoord());
  dispatch(fetchRole());
  dispatch(fetchPosition());
  dispatch(fetchLocation());

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, updateCurrentSlide]);

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Nav />
        <ScrollToTop>
          <div style={{ height: 30 }}></div>
          <Switch>
            <>
              <Container className={classes.normalLinks}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => <Home {...props} />}
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
                  />
                  <Route
                    exact
                    path="/accountEdit"
                    render={(props) => <EditAccount {...props} />}
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
              <Container className={classes.adminLink}>
                <Route
                  exact
                  path="/admin"
                  render={(props) => <Admin {...props} />}
                />
                <Route
                  exact
                  path="/coordinator"
                  render={(props) => <Coordinator {...props} />}
                />
                <Route
                  exact
                  path="/admin/editaccount/:userId"
                  render={(props) => <AdminEditAccount {...props} />}
                />
              </Container>
            </>
          </Switch>
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
