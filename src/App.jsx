import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Protected from './components/Protected';
import Dashboard from './pages/dashboard/dashboard';
import Users from './pages/enrolledusers/enrolledusers';
import Home from './pages/home/home';
import Login from './pages/login/login';
import PageNotFound from './pages/pageNotFound';
import Profile from './pages/profile/profile';
import Register from './pages/register/register';
import ShowSingleBlog from './pages/showSingleBlog/showSingleBlog';
import UsersProfile from './pages/usersProfile/usersProfile';
import { getTokenUsername } from './services/loggedIn';
import { AuthContext } from './contexts/Contexts';
import { useContext } from 'react';

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(getTokenUsername);
  
  const tokenUsername = getTokenUsername();

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login setIsSignedIn={setIsSignedIn} />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/:username/blogs/:blogid" element={<ShowSingleBlog />}/>
        <Route path={`/profile/${tokenUsername}`} element={
          <Protected setIsSignedIn={setIsSignedIn} >
          <Profile setUsername={setLoggedInUsername}/>
          </Protected>
        }/>
        <Route path={`/profile/${tokenUsername}/:options`} element={
          <Protected setIsSignedIn={setIsSignedIn} >
          <Profile setUsername={setLoggedInUsername}/>
          </Protected>
        }/>
        <Route path="/enrolledusers" element={<Users />}/>
        <Route path="/profile/:username" element={<UsersProfile />} /> 
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}