import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/loggedIn";

export default function Protected({ setIsSignedIn, children }){
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn()){
            setIsSignedIn(true);
        }
        else {
         navigate("/login", {replace: true});
        }
    }, []);
    return children
}