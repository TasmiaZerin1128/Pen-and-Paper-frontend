import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useRef } from 'react';
import { getAllUsers } from "../../services/user";

import { useNavigate } from "react-router-dom";
import '../Navbar/Navbar.css';

const SearchBar = ({onSearch}) => {

    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };

    useEffect(() => {
        console.log("Search message inside useEffect: ", searchQuery);
      }, [searchQuery]);
  
    return (
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "#863812" },
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
          borderColor: "#863812"
            }
          },
          "& .MuiOutlinedInput-root.Mui-hover": {
            "& > fieldset": {
          borderColor: "#863812"
            }
          }
        }}    
        InputProps={{
          className:'input-root',
          style: {
            width: '20rem',
            position: 'relative',
            alignSelf: 'end',
            borderRadius: '5rem',
          },
          inputProps: {
            style: {
              paddingLeft: '30px',
            },
          },
          startAdornment: (
              <SearchIcon
              style={{
                color:'#5B3203',
                position: 'absolute',
                top: '50%',
                left: '8px',
                transform: 'translateY(-50%)',
              }}
            />
          ),
        }}
      />
    );
  };


export default function NavbarUsers({onSearch}) {

    const navigate = useNavigate();


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#EBE4D2', borderBottom: '#5B3203 1px solid', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <img src='src\assets\images\logo-sm.svg' onClick={(e)=> navigate('../')} style={{ width: '4rem', marginTop: '0.5rem' }} />
          </Typography>
          <SearchBar onSearch={onSearch}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}