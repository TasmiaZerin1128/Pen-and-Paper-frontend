import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function isLoggedIn () {
    let jwtcookie = Cookies.get('jwt');
    if(jwtcookie) return true;
    return false;
} 

function getCookieUsername () {
    let cookie = Cookies.get('jwt');
    let { username } = jwt_decode(cookie);
    if(username) return username;
    return null;
}

export { isLoggedIn, getCookieUsername };