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
import { ToastContainer , Zoom } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { getUserByUsername, updateUserByUsername } from "../../services/user";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";
import OwnBlogs from "../../components/OwnBlogs/OwnBlogs";
import { showToast } from "../../services/toast";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";

const drawerWidth = 200;

function UserInfo({cookieUsername, setUserId}) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const [disableSave, setDisableSave] = useState(true);

  const navigate = useNavigate();

  const updatePassword = async () => {
    const updatedUser = {
      oldPassword: oldPassword,
      newPassword: password
    }
    if(password.length >= 6){
      let response = await updateUserByUsername(username, updatedUser);
      if(response.status === 200){
        console.log("successful");
        setPassword("");
        setOldPassword("");
        setError(null);
        showToast("Password updated successfully","passwordChanged" );
      } else {
        setError(response.data);
      }
    } else {
      setError("Password must be atleast of 6 characters");
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
      setUserId(details.data.id);
      setFullName(details.data.fullName);
      setUsername(details.data.username);
      setEmail(details.data.email);
    }
    getUserDetails();
  }, [cookieUsername]);

  return (
    <div className="userInfoWrapper">
      <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#168030" }}/>
      <div className="profilePicWrap">
        <img
          src="\src\assets\images\profile-pic2.jpg"
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
        <div className="infoForm" style={{padding: '1rem 4rem 1.5rem'}}>
          <div className="individual">
            { error ? (<h4 style={{ backgroundColor: '#d6817d', borderRadius: '5px', color: 'white', padding: '0.5rem 1rem'}}>{error}</h4>) : null }
          </div>
          <div className="individual">
            <h4 style={{marginRight: '2rem'}}>Old Password</h4>
            <TextField
                id="oldpassword"
                size="small"
                label={oldPassword === "" ? "Enter Old Password" : ""}
                variant="outlined"
                type="password"
                InputLabelProps={{ shrink: false }}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{ width: "70%"}}
              />
          </div>
          <div className="individual">
            <h4 style={{marginRight: '2rem'}}>New Password</h4>
            <TextField
                id="password"
                size="small"
                label={password === "" ? "Enter New Password" : ""}
                variant="outlined"
                type="password"
                InputLabelProps={{ shrink: false }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "70%"}}
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

export default function Profile({setUsername}) {

  const [selectedOption, setSelectedOption] = useState("");

  const { checkLoggedIn, loggedInUsername } = useContext(AuthContext);

  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    let optionPage = option;
    navigate(`/profile/${loggedInUsername}/${optionPage}`);
  }

  useEffect(() => {
    if(checkLoggedIn()){
      if(setUsername) setUsername(loggedInUsername);
    }

    const options = location.pathname.split('/');
    const currentOption = options.at(-1);
    if(currentOption !== loggedInUsername){
      setSelectedOption(currentOption);
    } else {
      setSelectedOption("user-info");
    }
  }, [loggedInUsername]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
              <h1>My Profile</h1>
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
            <ListItemButton selected={selectedOption === "user-info"} 
            onClick={() => handleOptionClick("user-info")}
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
            <ListItemButton selected={selectedOption === "own-blogs"}
            onClick={() => handleOptionClick("own-blogs")}
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
            <ListItemButton selected={selectedOption === "delete-account"} 
            onClick={() => handleOptionClick("delete-account")}
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
        {selectedOption === "user-info" ? (<UserInfo cookieUsername={loggedInUsername} setUserId={setUserId}/>) : null}
        {selectedOption === "delete-account" ? (<DeleteAccount cookieUsername={loggedInUsername}/>) : null}
        {selectedOption === "own-blogs" ? (<OwnBlogs cookieUsername={loggedInUsername} userId={userId}/>) : null}
      </Box>
    </Box>
  );
}
