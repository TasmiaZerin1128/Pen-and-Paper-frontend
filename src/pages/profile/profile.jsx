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
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./profile.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";
import OwnBlogs from "../../components/OwnBlogs/OwnBlogs";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import UserInfo from "../../components/UserInfo/UserInfo";

const drawerWidth = 200;

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
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate("/dashboard")}>
            <img src='\src\assets\images\logo-sm.svg' style={{ width: '4rem', marginTop: '0.5rem' }}/>
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
