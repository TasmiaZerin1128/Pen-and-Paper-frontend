import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./register.css";

export default function Form() {
  const [fullName, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (fullName === "" || username === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      try {
        await fetch("http://localhost:3000/api/v1/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName,
            username: username,
            password: password,
            email: email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      {/* <div className="messages">
		{errorMessage()}
		{successMessage()}
	</div> */}

      <div className="left">
		<img className="logo" src="src\assets\logo-pen-paper.png" />
	  </div>
      <div className="right">
        <form>
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            className="input"
            value={fullName}
            type="text"
          />

          <TextField
            id="username"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            value={username}
            type="text"
          />

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            value={email}
            type="email"
          />

          <TextField
            id="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            value={password}
            type="password"
          />

          <Button
            className="submit"
            variant="contained" disableElevation
            onClick={submit}
            type="submit"
          >
            Register
          </Button>
		  <h4>Already have an account?<span><a href="/login"> Sign In</a></span></h4>
        </form>
      </div>
    </div>
  );
}
