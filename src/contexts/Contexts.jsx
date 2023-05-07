import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { parseCookie } from "../services/loggedIn";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(null);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    const tokenUsername = parseCookie();
    if(tokenUsername && tokenUsername!== 'expired'){
      setIsSignedIn(true);
      setLoggedInUsername(tokenUsername);
      return true;
    }
    setIsSignedIn(false);
    setLoggedInUsername(null);
    return false;
  }

  const setStatusSignedIn = () => {
    try {
      let jwtcookie = Cookies.get("jwt");
      let { username } = jwt_decode(jwtcookie);
      console.log("Signed In " + username);
      setIsSignedIn(true);
      setLoggedInUsername(username);
    } catch {
      console.log("No correct token found");
      Cookies.remove("jwt");
      setIsSignedIn(false);
      setLoggedInUsername(null);
    }
  };

  const setStatusSignedOut = () => {
    Cookies.remove("jwt");
    setIsSignedIn(false);
    setLoggedInUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
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
