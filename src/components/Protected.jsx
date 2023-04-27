import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Protected({ setIsSignedIn, children }){
    const navigate = useNavigate();

    useEffect(() => {
        let cookie = Cookies.get('jwt');
        if(cookie){
            setIsSignedIn(true);
        }
        else {
         navigate("/login", {replace: true});
        }
    }, []);
    return children
}