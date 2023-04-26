import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected({ isSignedIn, children }){
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isSignedIn);
        if(!isSignedIn){
         navigate("/login", {replace: true});
        }
    }, []);
    return children
}