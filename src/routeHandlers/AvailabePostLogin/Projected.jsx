import React, { useContext } from "react";
import { UserData } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { LOGGEDIN } = useContext(UserData);
  if (!LOGGEDIN) {
    return setTimeout(() => { window.location.href = '/login' }, 1000);
  }
  else {
    return children;
  }
};

export default Protected;
