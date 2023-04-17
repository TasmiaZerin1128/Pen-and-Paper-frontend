import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";
import './navbar.css';


export default function ButtonAppBar() {

    const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#EBE4D2', borderBottom: '#5B3203 1px solid' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <img src='src\assets\logo-sm.svg' style={{ width: '4rem', marginTop: '0.5rem' }} />
          </Typography>
          <Button className="loginNav" onClick={() => navigate("/login")}>Sign In</Button>
          <Button className="registerNav" onClick={() => navigate("/register")}>Get Started</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}