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
import { Grid } from "@mui/material";
import { useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DescriptionIcon from "@mui/icons-material/Description";
import "./profile.css";

const drawerWidth = 200;

function UserInfo() {

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className="userInfoWrapper">
        <div className="profilePicWrap">
            <img
        src="src\assets\images\profile-pic2.jpg"
        alt="profile"
        className="profilePic"
      />
        </div>
      <div className="info">
        <form>
        <div className="individual">
            <h4>Full Name</h4>
            <TextField 
                id="fullname" 
                label={fullName=== "" ? "Full Name": ""} 
                variant="outlined" 
                value={fullName} 
                InputLabelProps={{shrink: false}} 
                onChange={(e) => setFullName(e.target.value)} 
                style={{width: '70%'}}
            />
        </div>
        <div className="individual">
            <h4>Username</h4>
            <TextField 
                id="username" 
                label={username=== "" ? "Username": ""} 
                variant="outlined" 
                InputLabelProps={{shrink: false}} 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={{width: '70%'}}
            />
        </div>
        <div className="individual">
            <h4>Email</h4>
            <TextField 
                id="email" 
                label={email=== "" ? "Email": ""} 
                variant="outlined" 
                InputLabelProps={{shrink: false}} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{width: '70%'}}
            />
        </div>
        <div className="individual">
            <h4>Password</h4>
            <TextField 
                id="password" 
                label={password=== "" ? "Password": ""} 
                variant="outlined" 
                InputLabelProps={{shrink: false}} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{width: '70%'}}
            />
        </div>
        </form>
      </div>
      <div className="profileButtons">
        <Button variant="outlined" className="goBack">Go Back</Button>
        <Button variant="contained" className="save">Save Changes</Button>
      </div>
      
    </div>
  );
}

export default function Profile() {
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
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="User Info" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Blogs" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#EBE4D2", p: 3, margin: "auto" }}
      >
        <Toolbar />
        <UserInfo />
      </Box>
    </Box>
  );
}
