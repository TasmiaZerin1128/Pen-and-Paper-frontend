import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function isLoggedIn() {
  const tokenUsername = parseCookie();
  if(tokenUsername && tokenUsername!== 'expired'){
    return true;
  }
  return false;
}

function parseCookie() {

  let jwtcookie = Cookies.get("jwt");
  try {
    let token = jwt_decode(jwtcookie);
    if (token.username) {
      let expirationTime = token.exp;
      let current_time = Date.now() / 1000;
      // console.log(token.exp + " " + current_time);
      if (expirationTime < current_time) {
        console.log("Session expired");
        return "expired";
      }
      console.log("Signed In");
      return token.username;
    }
    return false;
  } catch {
    console.log("No correct token found");
    Cookies.remove("jwt");
    return false;
  }
}

export { parseCookie, isLoggedIn };
