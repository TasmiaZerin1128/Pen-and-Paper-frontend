import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SessionExpiredPopUp from "./components/SessionExpiredPopUp/SessionExpired";
import { AuthContext } from "./contexts/Contexts";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/enrolledusers/enrolledusers";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import PageNotFound from "./pages/pageNotFound";
import Profile from "./pages/profilePage/profilePage";
import Register from "./pages/register/register";
import ShowSingleBlog from "./pages/showSingleBlog/showSingleBlog";
import { loginStatus } from "./services/loggedIn";

export default function App() {
  const [profileUsername, setProfileUsername] = useState(null);

  const { expired, loggedInUsername, checkLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if(checkLoggedIn()){
      setProfileUsername(loggedInUsername);
    }
  });

  return (
    <>
      {expired ? <SessionExpiredPopUp /> : null}
      <Routes>
        <Route path="/register" element={ loginStatus() ? <Navigate to='/dashboard'/> : <Register /> } />
        <Route path="/login" element={ loginStatus() ? <Navigate to='/dashboard'/> : <Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<Dashboard setProfileUsername={setProfileUsername} />}
        />
        <Route path="/blogs/:blogid" element={<ShowSingleBlog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username/:options" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
