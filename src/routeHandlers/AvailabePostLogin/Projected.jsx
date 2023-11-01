import React, { useContext } from "react";
import { UserData } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { LOGGEDIN } = useContext(UserData);
  if (!LOGGEDIN) return window.location.href = '/login';
  return children;
};

export default Protected;
