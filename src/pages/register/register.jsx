import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { register } from "../../services/auth";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";

export default function Form() {
  const [fullName, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [errorOrSuccessLine, setErrorOrSuccessLine] = useState("");

  const [errorFullName, setErrorFullName] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [errorLineFullName, setErrorLineFullName] = useState("");
  const [errorLineUsername, setErrorLineUsername] = useState("");
  const [errorLineEmail, setErrorLineEmail] = useState("");
  const [errorLinePassword, setErrorLinePassword] = useState("");

  const navigate = useNavigate();

  const { checkLoggedIn, setStatusSignedIn } = useContext(AuthContext);

    useEffect(() => {
        if(checkLoggedIn()){
            navigate("/dashboard");
        }
    }, []);

  const submit = async (e) => {
    e.preventDefault();
    if(validateFullName(fullName) && validateUsername(username) && validateEmail(email) && validatePassword(password)) {

	  const newUser = {
		    fullName: fullName,
        username: username,
        password: password,
        email: email,
	  };

    try{
    const response = await register(newUser);
    console.log(response.status);
    if(String(response.status)[0] == 2){
      setSubmitted(true);
      setErrorOrSuccessLine("User successfully registered! Please go to the login section");
      console.log(response.data);
      setStatusSignedIn();
      navigate("/login", { state: { message: "User registered successfully" } });
    } else {
      setSubmitted(false);
      setErrorOrSuccessLine(response.data);
      console.log(response.data);
    }
    } catch (err) {
      console.log("An error occured!");
      setErrorOrSuccessLine("An error occured");
    }
    } else {
      setErrorOrSuccessLine("Please enter all the fields correctly!");
    }
  };

  const validateFullName = (value) => {
    if (value === "") {
      setErrorFullName(true);
      setErrorLineFullName("\u{26A0} Full Name is required");
      return false;
    } 
      setErrorFullName(false);
      setErrorLineFullName("");
      return true;
  }

  const validateUsername = (value) => {
    if (value === "") {
      setErrorUsername(true);
      setErrorLineUsername("\u{26A0} Username is required");
      return false;
    } 
    if(!value.match(/^[a-zA-Z0-9]+$/)) {
      setErrorUsername(true);
      setErrorLineUsername("\u{26A0} Username cannot contain any special characters");
      return false;
    } 
      setErrorUsername(false);
      setErrorLineUsername("");
      return true;
  }

  const validateEmail = (value) => {
    if (value === "") {
      setErrorEmail(true);
      setErrorLineEmail("\u{26A0} Email is required");
      return false;
    } 
      setErrorEmail(false);
      setErrorLineEmail("");
      return true;
  }

  const validatePassword = (value) => {
    if (value === "") {
      setErrorPassword(true);
      setErrorLinePassword("\u{26A0} Password is required");
      return false;
    } 
    if(value.length < 6) {
      setErrorPassword(true);
      setErrorLinePassword("\u{26A0} Password must be atleast of 6 characters");
      return false;
    } 
      setErrorPassword(false);
      setErrorLinePassword("");
      return true;
  }

  const registerStatus = () => {
    return (
      <div
        className="registerStatus"
      >
        <h5>{errorOrSuccessLine}</h5>
      </div>
    );
  };

  return (
    <>
    <div className="form">
      <div className="left">
		<img className="logo" src="src\assets\images\logo-pen-paper.png" onClick={(e)=> navigate('/')}/>
	  </div>
      <div className="right">
      <div className="messages">
        {registerStatus()}
	    </div>
        <form>
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            className="input"
            value={fullName}
            type="text"
			      error={errorFullName} helperText={errorLineFullName}
            onBlur={e => validateFullName(e.target.value)}
          />

          <TextField
            id="username"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            value={username}
            type="text"
            error={errorUsername} helperText={errorLineUsername}
            onBlur={e => validateUsername(e.target.value)}
          />

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            value={email}
            type="email"
            error={errorEmail} helperText={errorLineEmail}
            onBlur={e => validateEmail(e.target.value)}
          />

          <TextField
            id="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            value={password}
            type="password"
            error={errorPassword} helperText={errorLinePassword}
            onBlur={e => validatePassword(e.target.value)}
          />

          <Button
            className="submit"
            variant="contained" disableElevation
            onClick={submit}
            type="submit"
          >
            Register
          </Button>
		  <h4 className="loginLine">Already have an account?<span><a href="/login" className="signIn"> Sign In</a></span></h4>
        </form>
      </div>
    </div>
    </>
  );
}
