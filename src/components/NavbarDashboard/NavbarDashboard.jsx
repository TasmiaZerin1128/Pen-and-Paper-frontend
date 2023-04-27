import * as React from 'react';
import { useState } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, alpha } from '@mui/material/styles';
import Cookies from 'js-cookie';

import { useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import { createBlog } from '../../services/blog';
import { logout } from '../../services/auth';

import './NavbarDashboard.css';

function FormDialog({handleBlogAdd}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const create = async () => {
    const newBlog = {
      title: title,
      description: description
    };
    const response = await createBlog(newBlog);
    console.log(response.data);
    if(String(response.status)[0] == 2){
        handleClose();
        handleBlogAdd();
    } else {
      console.log(response.data);
    }
  }

  return (
    <div>
      <Button className="create" onClick={handleClickOpen} >+ Create Blog</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{backgroundColor: '#EBE4D2', color: '#863812', paddingLeft: '3rem', fontFamily: 'Poppins'}}><b><h3>Create a New Blog</h3></b></DialogTitle>
        <DialogContent sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '3rem'}}>
          <TextField
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{style: {fontSize: 40}}}
            sx={{marginBottom: '1.4rem'}}
            onChange={(e) => setTitle(e.target.value)}
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

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    
    const logoutUser = async () => {
      try {
      const response = await logout();
      console.log(response);
      navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
    

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#EBE4D2', borderBottom: '#5B3203 1px solid', padding: '0 10rem', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <img src='src\assets\images\logo-sm.svg' style={{ width: '4rem', marginTop: '0.5rem' }} onClick={(e)=> navigate('../')}/>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <SearchBar />
          <FormDialog handleBlogAdd={handleBlogAdd}/>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="profile icon" src="src\assets\images\profile-pic2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" sx={{padding: 0}} onClick={(e) => navigate('/profile')}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" sx={{padding: 0}} onClick={(e) => logoutUser()}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}