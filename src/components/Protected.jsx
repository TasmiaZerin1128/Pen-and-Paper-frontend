import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Contexts";

export default function Protected({ children }){
    const navigate = useNavigate();

    const { checkLoggedIn, setExpired } = useContext(AuthContext);

    useEffect(() => {
        if(!checkLoggedIn()){
            setExpired(true);
            navigate("/login", {replace: true});
        }
    }, []);
    return children
}