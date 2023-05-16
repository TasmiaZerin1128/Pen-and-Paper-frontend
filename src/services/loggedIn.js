import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function parseCookie() {
  let jwtcookie = Cookies.get("jwt");
  try {
    let token = jwt_decode(jwtcookie);
    return token.username;
  } catch {
    Cookies.remove("jwt");
    return false;
  }
}

function tokenExpired() {
  try {
      let jwtcookie = Cookies.get("jwt");
      let token = jwt_decode(jwtcookie);
      let expirationTime = token.exp;
      let current_time = Date.now() / 1000;
      if (expirationTime < current_time) {
        return true;
      }
    return false;
  } catch {
    return false;
  }
}

function loginStatus() {
  if(!tokenExpired()){
  const tokenUsername = parseCookie();
  if(tokenUsername){
    return true;
  }
  return false;
 } else {
    return false;
 }
}

export { parseCookie, tokenExpired, loginStatus };
