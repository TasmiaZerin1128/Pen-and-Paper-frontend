import Register from './pages/register/register';
import Login from './pages/login/login';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { useEffect, useState } from 'react';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Users from './pages/enrolledusers/enrolledusers';
import Protected from './components/Protected';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    let cookie = Cookies.get('jwt');
    if(cookie){
      console.log(jwt_decode(cookie));
      setIsSignedIn(true);
      console.log(isSignedIn);
    }
  }, [isSignedIn]);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login setIsSignedIn={setIsSignedIn} />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={
        <Protected isSignedIn={isSignedIn}>
        <Dashboard />
      </Protected>}/>
        <Route path="/enrolledusers" element={<Users />}/>
      </Routes>
    </>
  )
}

export default App
