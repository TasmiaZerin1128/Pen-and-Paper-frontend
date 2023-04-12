import { useState } from 'react';
import { TextField } from '@mui/material';
import './register.css';

export default function Form() {

// States for registration
const [fullName, setName] = useState('');
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the email change
const handleEmail = (e) => {
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (name === '' || email === '' || password === '') {
	setError(true);
	} else {
	setSubmitted(true);
	setError(false);
	}
};

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
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
		display: error ? '' : 'none',
		}}>
		<h1>Please enter all the fields</h1>
	</div>
	);
};

return (
	<div className="form">
	<div>
		<h1>User Registration</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		<TextField 
        id="outlined-basic" 
        label="Full Name" variant="outlined" 
        onChange={(e)=>setName(e.target.value)} 
        className="input"
		value={fullName} type="text" />

        <TextField 
        id="outlined-basic" 
        label="Email" variant="outlined"  
        onChange={(e)=>setEmail(e.target.value)} className="input"
		value={email} type="email" />

        <TextField 
        id="outlined-basic" 
        label="Password" variant="outlined"  
		onChange={(e)=>setPassword(e.target.value)} className="input"
		value={password} type="password" />

		<button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
	</form>
	</div>
);
}
