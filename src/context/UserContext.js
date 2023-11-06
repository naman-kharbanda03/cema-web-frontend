import { createContext, useEffect, useReducer, useState } from "react";

const UserData = createContext();
const UserContextWrapper = ({ children }) => {
  const [LOGGEDIN, SETLOGGEDIN] = useState(false);
  const [redirect, setRedirect] = useState("/");
  useEffect(() => {
    if (localStorage.getItem("accessToken")) SETLOGGEDIN(true);
    if (localStorage.getItem("path")) setRedirect(localStorage.getItem("path"));
  }, []);
  // useEffect(() => {
  //   console.log(redirect);
  // }, [redirect]);

  return (
    <UserData.Provider value={{ LOGGEDIN, SETLOGGEDIN, redirect, setRedirect }}>
      {children}
    </UserData.Provider>
  );
};

export { UserData, UserContextWrapper };
