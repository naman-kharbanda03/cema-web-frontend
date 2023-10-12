import { createContext, useEffect, useReducer, useState } from "react";

const UserData = createContext();
const UserContextWrapper = ({ children }) => {
  const [LOGGEDIN, SETLOGGEDIN] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) SETLOGGEDIN(true);
  }, []);

  return (
    <UserData.Provider value={{ LOGGEDIN, SETLOGGEDIN }}>
      {children}
    </UserData.Provider>
  );
};

export { UserData, UserContextWrapper };
