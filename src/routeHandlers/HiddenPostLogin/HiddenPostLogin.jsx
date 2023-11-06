import React, { useContext } from "react";
import { UserData } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const HiddenPostLogin = ({ children }) => {
  const { LOGGEDIN, redirect } = useContext(UserData);
  console.log("test", LOGGEDIN, redirect);
  if (LOGGEDIN) {
    return <Navigate to={redirect} />;
  }
  return children;
};

export default HiddenPostLogin;
