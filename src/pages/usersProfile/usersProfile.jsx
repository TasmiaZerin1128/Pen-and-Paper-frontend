import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import BlogList from "../../components/Blogs/Blogs";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./usersProfile.css";

function UsersNavbar({ userName }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          className="profileNav"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              <h1>{userName}'s Profile</h1>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

function ProfileInformation ({userName, userFullName, userEmail}) {
  return (
    <>
      <div className="profile">
        <div className="profilePicWrap">
          <img
            src="\src\assets\images\bare-bear.png"
            alt="profile"
            className="profilePicture"
          />
        </div>
        <div className="profileInfo">
          <h4 style={{ margin: 0 }}>
            <b>{userFullName}</b> @{userName}
          </h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MailIcon sx={{ color: "#863812", width: 30, marginRight: "10px" }}/>
            <h4>{userEmail}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default function UsersProfile() {

  const location = useLocation();
  const navigate = useNavigate();

  // const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userFullName, setUserFullName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (location.state) {
      const user = location.state.data;
      // setUserDetails(user);
      setUserId(user.id);
      setUserName(user.username);
      setUserFullName(user.fullName);
      setUserEmail(user.email);
    } else {
      navigate("/enrolledusers");
    }
}, [location]);

  return(
    <>
    <UsersNavbar userName={userName} />
    <ProfileInformation userName={userName} userFullName={userFullName} userEmail={userEmail}/>
    <div style={{margin: '1rem 10rem 3rem'}}>
      { userId && <BlogList blogAdded={null} pageNumber={1} authorId={userId}/>}
    </div>
    </>
  )
}
