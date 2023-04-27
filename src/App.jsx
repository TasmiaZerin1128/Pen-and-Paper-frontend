import Register from './pages/register/register';
import Login from './pages/login/login';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { useEffect, useState } from 'react';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Users from './pages/enrolledusers/enrolledusers';
import Protected from './components/Protected';
import Profile from './pages/profile/profile';

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login setIsSignedIn={setIsSignedIn} />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={
          <Protected setIsSignedIn={setIsSignedIn} >
          <Dashboard />
          </Protected>
        }/>
        <Route path="/profile" element={
          <Protected setIsSignedIn={setIsSignedIn} >
          <Profile />
          </Protected>
        }/>
        <Route path="/enrolledusers" element={<Users />}/>
      </Routes>
    </>
  )
}

export default App
