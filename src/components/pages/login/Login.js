import React, { useEffect } from "react";
import { auth, firebaseUiConfig } from "../../../firebase/Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import Divider from "./../../others/Divider";

const useStyles = makeStyles({
  login: { marginTop: 100 },
});

const Login = ({ userData }) => {
  const classes = useStyles();

  let history = useHistory();

  //****testing
  console.log("userData", userData);
  useEffect(() => {
    if (userData.userId) {
      console.log("push to /");
      history.push("/");
    }
  }, [userData, history]);

  return (
    <>
      <Box>
        <Typography variant="h4" align="center">
          LOGIN
        </Typography>
      </Box>
      <Divider />
      <Box className={classes.login}>
        <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={auth} />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
