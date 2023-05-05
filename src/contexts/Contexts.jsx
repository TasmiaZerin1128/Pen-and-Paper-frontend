import { createContext, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const setStatusSignedIn = () => {

    try {
        let jwtcookie = Cookies.get("jwt");
        let token = jwt_decode(jwtcookie);
        if (token.username) {
            let expirationTime = token.exp;
            let current_time = Date.now() / 1000;
        // console.log(token.exp + " " + current_time);
            if (expirationTime < current_time) {
            console.log("Session expired");
            setIsSignedIn(false);
            setLoggedInUsername("expired");
            }
            console.log("Signed In " + token.username);
            setIsSignedIn(true);
            setLoggedInUsername(token.username);
        } else {
        setIsSignedIn(false);
        setLoggedInUsername(null);
        }
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
  }

    return (
        <AuthContext.Provider value={{ isSignedIn, loggedInUsername, setStatusSignedIn, setStatusSignedOut }}>{props.children}</AuthContext.Provider>
    );
};
