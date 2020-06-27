import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { Link as RouterLink } from "react-router-dom";
import { fetchAllUser } from "../../redux/action/adminAction";
import AdminUser from "./user/AdminUser";
import AdminContent from "./content/AdminContent";
import TitleHeader from "../../titleHeader/TitleHeader";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  searchField: {
    marginBottom: 20,
    marginRight: 10,
  },
  button: {
    marginRight: 10,
  },
  boxContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

const Admin = () => {
  const classes = useStyles();
  let { url, path } = useRouteMatch();

  return (
    <div>
      <TitleHeader title="ADMIN PANEL" />
      <div className={classes.boxContainer}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          component={RouterLink}
          to={`${url}/user`}
        >
          USER ACCOUNT
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          component={RouterLink}
          to={`${url}/content`}
        >
          CONTENT
        </Button>
      </div>
      <Switch>
        <Route exact path={path}>
          Select A Link
        </Route>
        <Route exact path={`${path}/user`}>
          <AdminUser />
        </Route>
        <Route exact path={`${path}/content`}>
          <AdminContent />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  const allUser = state.adminData.allUser;

  return {
    allUser,
  };
};

const mapDispatchToProps = {
  fetchAllUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
