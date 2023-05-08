import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { parseCookie } from "../services/loggedIn";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    const tokenUsername = parseCookie();
    if(tokenUsername && tokenUsername!== 'expired'){
      setExpired(false);
      setIsSignedIn(true);
      setLoggedInUsername(tokenUsername);
      return true;
    }
    if(tokenUsername === 'expired'){
      setExpired(true);
      setIsSignedIn(false);
      setLoggedInUsername(null);
      return false;
    }
    setExpired(false);
    setIsSignedIn(false);
    setLoggedInUsername(null);
    return false;
  }

  const setStatusSignedIn = () => {
    try {
      let jwtcookie = Cookies.get("jwt");
      let { username } = jwt_decode(jwtcookie);
      console.log("Signed In " + username);
      setExpired(false);
      setIsSignedIn(true);
      setLoggedInUsername(username);
    } catch {
      console.log("No correct token found");
      Cookies.remove("jwt");
      setExpired(false);
      setIsSignedIn(false);
      setLoggedInUsername(null);
    }
  };

  const setStatusSignedOut = () => {
    Cookies.remove("jwt");
    setExpired(false);
    setIsSignedIn(false);
    setLoggedInUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        expired,
        setExpired,
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
