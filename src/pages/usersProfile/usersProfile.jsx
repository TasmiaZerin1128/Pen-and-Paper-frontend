import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import BlogList from "../../components/blogs/blogs";
import PaginationBar from "../../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserByUsername } from "../../services/user";
import "./usersProfile.css";

function UsersNavbar({ userName }) {
  return (
    <>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <AppBar
          position="fixed"
          className="profileNav"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
            <a href="/"><img src='\src\assets\images\logo-sm.svg' style={{ width: '4rem', marginTop: '0.5rem' }}/></a>
          </Typography>
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

  const navigate = useNavigate();
  // const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userFullName, setUserFullName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // const changePageNumber = (page) => {
  //   setPageNumber(page);
  // };

  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    async function fetchUserDetails() {
      const response = await getUserByUsername(username);
      if(response.status === 200){
        setUserId(response.data.id);
        setUserName(response.data.username);
        setUserFullName(response.data.fullName);
        setUserEmail(response.data.email);
      } else {
        navigate("*");
      }
    }
    fetchUserDetails();
}, [username]);

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
