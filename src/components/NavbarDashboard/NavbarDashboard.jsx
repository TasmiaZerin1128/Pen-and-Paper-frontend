import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogContentText } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Container from "@mui/material/Container";
import GroupIcon from '@mui/icons-material/Group';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from 'react-toastify';
import { createBlog } from '../../services/blog';
import { logout } from '../../services/auth';

import './NavbarDashboard.css';
import { showToast } from '../../services/toast';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Contexts';

function FormDialog({handleBlogAdd}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [serverError, setServerError] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorLineTitle, setErrorLineTitle] = useState("");
  const [errorLineDescription, setErrorLineDescription] = useState("");

  const { checkLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    if(checkLoggedIn()){
      console.log("truee");
      setOpen(true);
    } else navigate('/login');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const create = async () => {

    if(title.trim() && description.trim()){
    const newBlog = {
      title: title,
      description: description
    };
      const response = await createBlog(newBlog);
      console.log(response.data);
      if(String(response.status)[0] == 2){
          showToast("Blog added to timeline", "newBlog");
          handleClose();
          handleBlogAdd();
          setErrorTitle(false);
          setErrorLineTitle("");
          setErrorDescription(false);
          setErrorLineDescription("");
      } else {
        console.log(response.data);
        setServerError(response.data);
      }
  } else {
    if(!title.trim()){
      setErrorTitle(true);
      setErrorLineTitle("Title of the blog is required");
    } else {
      setErrorTitle(false);
      setErrorLineTitle("");
    }
    if(!description.trim()){
      setErrorDescription(true);
      setErrorLineDescription("Description cannot be blank");
    } else {
      setErrorDescription(false);
      setErrorLineDescription("");
    }
  }
  }

  return (
    <div>
      <Button className="create" onClick={handleClickOpen} >+ Create Blog</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{backgroundColor: '#EBE4D2', color: '#863812',paddingTop: '3rem', paddingLeft: '2.7rem', fontFamily: 'Poppins'}}><b>Create a New Blog</b></DialogTitle>
        <DialogContent sx={{backgroundColor: '#EBE4D2', padding: '3rem'}}>
        <DialogContentText id="alert-dialog-slide-description" sx={{ color: '#b11e1e'}}>
            {serverError}
          </DialogContentText>
          <TextField
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{style: {fontSize: 40}}}
            sx={{marginBottom: '1.4rem'}}
            onChange={(e) => setTitle(e.target.value)}
            error={errorTitle} helperText={errorLineTitle}
          />
          <TextField
          id="body"
          label="Description"
          type="text"
          multiline
          fullWidth
          variant="outlined"
          inputProps={{style: {fontSize: 18}}}
          maxRows={8}
          minRows={8}
          onChange={(e) => setDescription(e.target.value)}
          error={errorDescription} helperText={errorLineDescription}
        />
        </DialogContent>
        <DialogActions sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '0 3rem 3rem'}}>
          <Button sx={{backgroundColor: '#EBE4D2', color: '#863812'}} onClick={handleClose}>Cancel</Button>
          <Button style={{backgroundColor: '#863812', color: '#EBE4D2', padding: '0.6rem 1.5rem', borderRadius: '5px'}} onClick={create}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function NavbarDashboard({handleBlogAdd}) {

    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);

    const { checkLoggedIn, loggedInUsername, setStatusSignedOut } = useContext(AuthContext);

    useEffect(() => {
      if(!checkLoggedIn()){
        navigate("/");
      }
    }, []);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    
    const logoutUser = async () => {
      try {
      const response = await logout();
      setStatusSignedOut();
      console.log(response);
      navigate("/");
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <>
      <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#168030" }}/>
      <AppBar
        position="sticky"
        style={{
          backgroundColor: "#EBE4D2",
          borderBottom: "#5B3203 1px solid",
          boxShadow: "none"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
                <img
                  src="\src\assets\images\logo-sm.svg"
                  alt="logo"
                  style={{ width: "4rem", marginTop: "0.5rem" }}
                />
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon style={{ color: '#863812'}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                <MenuItem style={{ backgroundColor: 'transparent'}}>
                  <FormDialog handleBlogAdd={handleBlogAdd}/>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
                <img
                  src="\src\assets\images\logo-sm.svg"
                  alt="logo"
                  style={{ width: "4rem", marginTop: "0.5rem" }}
                />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <FormDialog handleBlogAdd={handleBlogAdd}/>
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'row'}}>
              { checkLoggedIn ? (<Typography textAlign="left" variant='body1' sx={{padding: '0.5rem', fontSize: '15px', color: '#863812', fontFamily: 'Poppins'}}>Welcome <br/><b>{loggedInUsername}</b>!</Typography>) : <></>} 
              <Tooltip title="Open Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="profile icon"
                    src="\src\assets\images\profile-pic2.jpg"
                  />
                </IconButton>
              </Tooltip>
              </div>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disabled>
                  <Typography
                    textAlign="left"
                    variant="body1"
                    sx={{ padding: 0, fontSize: "14px" }}
                  >
                    Signed in as <br />
                    <b>{loggedInUsername}</b>
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={(e) => navigate(`/profile/${loggedInUsername}`)}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography
                    textAlign="center"
                    sx={{ padding: 0 }}
                  >
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={(e) => logoutUser()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography
                    textAlign="center"
                    sx={{ padding: 0 }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </>
    );
}