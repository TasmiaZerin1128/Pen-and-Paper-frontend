import Register from './pages/register/register';
import Login from './pages/login/login';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { useEffect, useState } from 'react';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import ShowSingleBlog from './pages/showSingleBlog/showSingleBlog';
import Users from './pages/enrolledusers/enrolledusers';
import Protected from './components/Protected';
import Profile from './pages/profile/profile';
import UsersProfile from './pages/usersProfile/usersProfile';
import PageNotFound from './pages/pageNotFound';
import { getTokenUsername } from './services/loggedIn';

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  const tokenUsername = getTokenUsername();

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login setIsSignedIn={setIsSignedIn} />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/dashboard/:pagenumber" element={<Dashboard />}/>
        <Route path="/:username/blogs/:blogid" element={<ShowSingleBlog />}/>
        <Route path={`/profile/${tokenUsername}`} element={
          <Protected setIsSignedIn={setIsSignedIn} >
          <Profile />
          </Protected>
        }/>
        <Route path="/enrolledusers" element={<Users />}/>
        <Route path="/enrolledusers/:pagenumber" element={<Users />}/>
        <Route path="/profile/:username" element={<UsersProfile />} /> 
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
