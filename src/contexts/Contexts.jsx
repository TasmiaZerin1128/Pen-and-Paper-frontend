import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { parseCookie, tokenExpired } from "../services/loggedIn";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [expired, setExpired] = useState(false);
  const pageNumber = 1;
  const pageSize = 5;

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    if(!tokenExpired()){
    const tokenUsername = parseCookie();
    if(tokenUsername){
      setExpired(false);
      setLoggedInUsername(tokenUsername);
      return true;
    }
    setExpired(false);
    setLoggedInUsername(null);
    return false;
   } else {
      setExpired(true);
      setLoggedInUsername(null);
      return false;
   }
  }

  const setStatusSignedIn = () => {
    try {
      let jwtcookie = Cookies.get("jwt");
      let { username } = jwt_decode(jwtcookie);
      console.log("Signed In " + username);
      setExpired(false);
      setLoggedInUsername(username);
    } catch {
      console.log("No correct token found");
      Cookies.remove("jwt");
      setExpired(false);
      setLoggedInUsername(null);
    }
  };

  const setStatusSignedOut = () => {
    Cookies.remove("jwt");
    setExpired(false);
    setLoggedInUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        pageNumber,
        pageSize,
        expired,
        setExpired,
        checkLoggedIn,
        loggedInUsername,
        setStatusSignedIn,
        setStatusSignedOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
