import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

export default function Protected({ setIsSignedIn, children }){
    const navigate = useNavigate();

    useEffect(() => {
        let cookie = Cookies.get('jwt');
        if(cookie){
            console.log(jwt_decode(cookie));
            setIsSignedIn(true);
        }
        else {
         navigate("/login", {replace: true});
        }
    }, []);
    return children
}