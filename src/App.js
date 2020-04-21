import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/others/ScrollToTop";
import Home from "./components/pages/home/Home.js";
import Nav from "./components/nav/Nav";
import NavBottom from "./components/nav/NavBottom";
import Topic from "./components/pages/topic/Topic";
import Slide from "./components/pages/slide/Slide";
import { getData } from "./components/redux/action";
import { connect } from "react-redux";
import topicData from "./Data/topicData.json";

function App({ getData, data, fireStoreCovid }) {
  useEffect(() => {
    getData(topicData);
    console.log("useEffect");
  }, [getData, fireStoreCovid]);

  return (
    <Router>
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
    </Router>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  getData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
