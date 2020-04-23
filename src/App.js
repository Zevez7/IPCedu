import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/others/ScrollToTop";
import Home from "./components/pages/home/Home.js";
import Nav from "./components/nav/Nav";
import NavBottom from "./components/nav/NavBottom";
import Topic from "./components/pages/topic/Topic";
import Slide from "./components/pages/slide/Slide";
import { connect } from "react-redux";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

// automatic responsive font sizes based on variant
// https://material-ui.com/customization/typography/
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Nav />
        <ScrollToTop>
          <div style={{ height: 30 }}></div>
          <Switch>
            <>
              <Route exact path="/" render={(props) => <Home {...props} />} />
              <Route
                exact
                path="/topic/:topic"
                render={(props) => <Topic {...props} />}
              />
              <Route
                exact
                path="/slide/:topic/:unit"
                render={(props) => <Slide {...props} />}
              />
            </>
          </Switch>
        </ScrollToTop>

        <NavBottom />
      </ThemeProvider>
    </Router>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
