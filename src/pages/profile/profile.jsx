import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { TextField, Button } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./profile.css";
import { useState, useEffect } from "react";
import { getCookieUsername } from "../../services/loggedIn";
import { ToastContainer , Zoom } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { getUserByUsername, updateUserByUsername } from "../../services/user";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";
import OwnBlogs from "../../components/OwnBlogs/OwnBlogs";
import { showToast } from "../../services/toast";

const drawerWidth = 200;

function UserInfo({cookieUsername}) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLinePassword, setErrorLinePassword] = useState("");

  const [userDetails, setUserDetails] = useState(null);

  const [disableSave, setDisableSave] = useState(true);

  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const updatePassword = async () => {
    const updatedUser = {
      password: password
    }
    if(password.length >= 6){
      let response = await updateUserByUsername(username, updatedUser);
      if(response.status === 200){
        console.log("successful");
        setPassword("");
        setErrorPassword(false);
        setErrorLinePassword("");
        showToast("Password updated successfully","passwordChanged" );
      }
    } else {
      setErrorPassword(true);
      setErrorLinePassword("Password must be atleast of 6 characters");
    }
  }

  useEffect(() => {
    if(password.length === 0){
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  }, [password])

  useEffect(() => {
    async function getUserDetails() {
      let details = await getUserByUsername(cookieUsername);
      setUserDetails(details.data);
      setFullName(details.data.fullName);
      setUsername(details.data.username);
      setEmail(details.data.email);
    }
    getUserDetails();
  }, [cookieUsername]);

  return (
    <div className="userInfoWrapper">
      <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#863812" }}/>
      <div className="profilePicWrap">
        <img
          src="src\assets\images\profile-pic2.jpg"
          alt="profile"
          className="profilePic"
        />
      </div>
      <div className="info">
        <div className="infoForm">
          <form>
            <div className="individual">
              <h4 style={{marginRight: '2rem'}}>Full Name</h4>
              <TextField
                id="fullname"
                label={fullName === "" ? "Full Name" : ""}
                variant="standard"
                value={fullName}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: false }}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: "70%" }}
              />
            </div>
            <div className="individual">
              <h4 style={{marginRight: '2rem'}}>Username</h4>
              <TextField
                id="username"
                label={username === "" ? "Username" : ""}
                variant="standard"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: false }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "70%" }}
              />
            </div>
            <div className="individual">
              <h4 style={{marginRight: '2rem'}}>Email</h4>
              <TextField
                id="email"
                label={email === "" ? "Email" : ""}
                variant="standard"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: false }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "70%" }}
              />
            </div>
          </form>
        </div>
        <hr style={{border: '1px solid #e0d8c3'}} />
        <div className="infoForm" style={{padding: '1.5rem 4rem'}}>
          <div className="individual">
            <h4 style={{marginTop: '0rem', marginRight: '2rem'}}>Password</h4>
            <TextField
                id="password"
                label={password === "" ? "Enter New Password" : ""}
                variant="outlined"
                type="password"
                InputLabelProps={{ shrink: false }}
                value={password}
                onChange={(e) => handlePassword(e)}
                style={{ width: "70%", color: "#863812" }}
                error={errorPassword} helperText={errorLinePassword}
              />
          </div>
        </div>
      </div>
      <div className="profileButtons">
        <Button variant="outlined" className="goBack" onClick={(e) => navigate("/dashboard")}>
          Go Back
        </Button>
        <Button disabled={disableSave} variant="contained" className="save" onClick={(e) => updatePassword()}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default function Profile() {

  const [selectedOption, setSelectedOption] = useState("userInfo");
  const [cookieUsername, setCookieUsername] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  }

  useEffect(() => {
    let cookieName = getCookieUsername();
    setCookieUsername(cookieName);
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className="profileNav"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <h1>User Profile</h1>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          backgroundColor: "#EBE4D2",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#EBE4D2",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding >
            <ListItemButton selected={selectedOption === "userInfo"} 
            onClick={() => handleOptionClick("userInfo")}
            sx={{
              color: '#5B3203',
              "&.Mui-selected": {
                backgroundColor: "rgba(134, 56, 18, 0.09)",
                "&:hover": {
                  backgroundColor: "rgba(134, 56, 18, 0.2)"
                }
              }
            }}>
              <ListItemIcon>
                <PermIdentityIcon sx={{color:"#5B3203"}}/>
              </ListItemIcon>
              <ListItemText sx={{marginLeft:"-20px"}} primary="User Info"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={selectedOption === "ownBlogs"}
            onClick={() => handleOptionClick("ownBlogs")}
            sx={{
              color: '#5B3203',
              "&.Mui-selected": {
                backgroundColor: "rgba(134, 56, 18, 0.09)",
                "&:hover": {
                  backgroundColor: "rgba(134, 56, 18, 0.2)"
                }
              }
            }}>
              <ListItemIcon>
                <DescriptionIcon sx={{color:"#5B3203"}}/>
              </ListItemIcon>
              <ListItemText sx={{marginLeft:"-20px"}} primary="Own Blogs" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={selectedOption === "deleteAccount"} 
            onClick={() => handleOptionClick("deleteAccount")}
            sx={{
              color:"#5B3203",
              "&.Mui-selected": {
                backgroundColor: "rgba(134, 56, 18, 0.09)",
                "&:hover": {
                  backgroundColor: "rgba(134, 56, 18, 0.2)"
                }
              }
            }}>
              <ListItemIcon>
                <DeleteOutlineIcon sx={{color:"#5B3203"}}/>
              </ListItemIcon>
              <ListItemText sx={{marginLeft:"-20px"}} primary="Delete Account" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#EBE4D2", p: 3, margin: "auto" }}
      >
        <Toolbar />
        {selectedOption === "userInfo" ? (<UserInfo cookieUsername={cookieUsername}/>) : null}
        {selectedOption === "deleteAccount" ? (<DeleteAccount cookieUsername={cookieUsername}/>) : null}
        {selectedOption === "ownBlogs" ? (<OwnBlogs cookieUsername={cookieUsername}/>) : null}
      </Box>
    </Box>
  );
}
