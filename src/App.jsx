import { createContext, useEffect, useState } from 'react';
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
import { parseCookie } from './services/loggedIn';
import { isLoggedIn } from './services/loggedIn';
import ErrorPopUp from './components/ErrorPopUp/ErrorPopUp';

export default function App() {

  const [profileUsername, setProfileUsername] = useState(null);
  const [expired, setExpired] = useState(false);


  useEffect(() => {
    const tokenUsername = parseCookie();
    if(tokenUsername === 'expired'){
      setExpired(true);
    } 
    if(isLoggedIn()){
      setProfileUsername(tokenUsername);
      setExpired(false);
    }
  }, []);
  

  return (
    <>
     {expired ? (<ErrorPopUp/>) : null }
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard setProfileUsername={setProfileUsername}/>}/>
        <Route path="/:username/blogs/:blogid" element={<ShowSingleBlog />}/>
        <Route path={`/profile/${profileUsername}`} element={
          <Protected>
          <Profile />
          </Protected>
        }/>
        <Route path={`/profile/${profileUsername}/:options`} element={
          <Protected>
          <Profile/>
          </Protected>
        }/>
        <Route path="/enrolledusers" element={<Users />}/>
        <Route path="/profile/:username" element={<UsersProfile />} /> 
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}