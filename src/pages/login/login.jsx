import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer , Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from "../../services/auth";
import { showToast } from "../../services/toast";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import Loading from "../../components/Loading/Loading";
import "./login.css";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const { setStatusSignedIn } = useContext(AuthContext);

    useEffect(() => {
        if (location.state) {
            showToast(location.state.message, location.state.message);
            location.state = null;
        }
    }, [location]);

    const submit = async (e) => {
        e.preventDefault();
        if(username.trim() !== "" && password.trim() !== ""){
        setIsLoading(true);
        const loginUser = {
            username: username,
            password: password
        }
        
        try{
            const response = await login(loginUser);
            setIsLoading(false);
            if(String(response.status)[0] == 2){
                setStatusSignedIn();
                navigate("/dashboard");
            }
                setError(true);
                setStatus(response.data);
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
          <div style={{ visibility : error ? "visible" : "hidden" }}
          >
            <h4 className="loginStatus">{status}</h4>
          </div>
        );
      };

    return(
        <>
        <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#168030" }}/>
        { isLoading ? <Loading/> : null}
        <div className="wrapper">
            <img className="logoLogin" src='images/logo-sm.svg' onClick={() => navigate("/")}/>
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
		        <h4 className="registerLine">Don't have an account?<span className="signUp" onClick={() => navigate("/register")}> Sign Up</span></h4>
            </form>
            </div>
        </div>
        </>
    )
}