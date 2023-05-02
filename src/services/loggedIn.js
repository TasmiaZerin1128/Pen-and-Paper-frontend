import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function isLoggedIn() {
  if (parseCookie()) return true;
  return false;
}

function getCookieUsername() {
  return parseCookie();
}

function parseCookie() {
  let jwtcookie = Cookies.get("jwt");
  try {
    let token = jwt_decode(jwtcookie);
    if (token.username) {
      let expirationTime = token.exp;
      let current_time = Date.now() / 1000;
      console.log(token.exp + " " + current_time);
      if (expirationTime < current_time) {
        Cookies.remove("jwt");
        console.log("Session expired");
        return false;
      }
      return token.username;
    }
    return false;
  } catch {
    console.log("No correct token found");
    Cookies.remove("jwt");
    return false;
  }
}

export { isLoggedIn, getCookieUsername };
