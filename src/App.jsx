import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Protected from "./components/Protected";
import SessionExpiredPopUp from "./components/SessionExpiredPopUp/SessionExpired";
import { AuthContext } from "./contexts/Contexts";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/enrolledusers/enrolledusers";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import PageNotFound from "./pages/pageNotFound";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";
import ShowSingleBlog from "./pages/showSingleBlog/showSingleBlog";
import UsersProfile from "./pages/usersProfile/usersProfile";

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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<Dashboard setProfileUsername={setProfileUsername} />}
        />
        <Route path="/blogs/:blogid" element={<ShowSingleBlog />} />
        <Route
          path={`/profile/${profileUsername}`}
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path={`/profile/${profileUsername}/:options`}
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/profile/:username" element={<UsersProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
