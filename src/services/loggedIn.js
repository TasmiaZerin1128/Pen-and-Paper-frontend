import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function parseCookie() {

  let jwtcookie = Cookies.get("jwt");
  try {
    let token = jwt_decode(jwtcookie);
    if (token.username) {
      let expirationTime = token.exp;
      let current_time = Date.now() / 1000;
      if (expirationTime < current_time) {
        return "expired";
      }
      return token.username;
    }
    return false;
  } catch {
    Cookies.remove("jwt");
    return false;
  }
}

export { parseCookie };
