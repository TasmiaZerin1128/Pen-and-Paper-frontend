import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./login.css";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className="wrapper">
            <img className="logoRaw" src="src\assets\raw-logo.png" />
            <h1>Welcome Back!</h1>
            <h3>Let's start imagining again</h3>
            <div className="loginForm">
            <form>
                <TextField 
                id="username" 
                label="Username" 
                variant="standard" 
                value={username}
                type="text"
                className="input"
                onChange={(e)=>setUsername(e.target.value)}
                />
                <TextField 
                id="password" 
                label="Password" 
                variant="standard" 
                value={password}
                type="password"
                className="input"
                onChange={(e)=>setPassword(e.target.value)}
                />
                <Button
                variant="contained" disableElevation
                type="submit"
                className="submit"
                >
                Login
                </Button>
		        <h4>Don't have an account?<span><a href="/register"> Sign Up</a></span></h4>
            </form>
            </div>
        </div>
    )
}