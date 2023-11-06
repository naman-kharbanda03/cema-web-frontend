import React, { useContext } from "react";
import { UserData } from "../../context/UserContext";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const { LOGGEDIN, redirect, setRedirect } = useContext(UserData);
  const location = useLocation();
  console.log(location)
  // setRedirect(location.pathname)
  localStorage.setItem('path', location.pathname);

  if (!localStorage.getItem('accessToken')) {
    return setTimeout(() => {
      window.location.href = '/login'
    }, 1000);
  }
  else {
    return children;
  }
};
export default Protected;
