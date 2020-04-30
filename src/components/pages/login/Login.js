import React from "react";
import { auth, firebaseUiConfig } from "../../firebase/Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Login = () => {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default Login;
