import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/loggedIn";

export default function Protected({ children }){
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLoggedIn()){
         navigate("/login", {replace: true});
        }
    }, []);
    return children
}