import React, { useContext } from "react";
import { UserData } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const HiddenPostLogin = ({ children }) => {
  const { LOGGEDIN } = useContext(UserData);
  console.log("test", LOGGEDIN);
  if (LOGGEDIN) return <Navigate to={"/"} />;
  return children;
};

export default HiddenPostLogin;
