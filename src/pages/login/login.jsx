import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from "../../services/auth";
import Cookies from 'js-cookie';
import "./login.css";

export default function Login({setIsSignedIn}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if(username !== "" && password !== ""){
        const loginUser = {
            username: username,
            password: password
        }
        
        try{
            const response = await login(loginUser);
            console.log(response.data);
            if(String(response.status)[0] == 2){
                setIsSignedIn(true);
                navigate("/dashboard");
            } else {
                setError(true);
                setStatus(response.data);
            }
        } catch (err) {
            setStatus("An error occured");
        }
        } else {
            setError(true);
            setStatus("Please enter your username and password");
        }
    }

    const loginStatus = () => {
        return (
          <div
            className="loginStatus" style={{ visibility : error ? "visible" : "hidden" }}
          >
            <h4>{status}</h4>
          </div>
        );
      };

    const validateFields = () => {
        if(username == ""){
            setError(true);
        }
        if(password == ""){
            setError(true);
        }
        if(error) return false;
        console.log(username + " " + password);
        return true;
    }

    useEffect(() => {
        let cookie = Cookies.get('jwt');
        if(cookie){
            Cookies.remove('jwt');
            navigate("/dashboard");
        }
        if (location.state) {
            toast.success(location.state.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored",
                });
            location.state = null;
        }
    }, [location]);


    return(
        <>
        <ToastContainer toastStyle={{ backgroundColor: "#863812" }}/>
        <div className="wrapper">
            <img className="logoRaw" src="src\assets\images\raw-logo.png" />
            <h1>Welcome Back!</h1>
            <h3>Let's start imagining again</h3>
            <div className="loginForm">
            <div className="messages">
                {loginStatus()}
	        </div>
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
                onClick={submit}
                >
                Login
                </Button>
		        <h4 className="registerLine">Don't have an account?<span><a href="/register" className="signUp"> Sign Up</a></span></h4>
            </form>
            </div>
        </div>
        </>
    )
}