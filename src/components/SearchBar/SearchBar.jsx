import React from 'react';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  };

  const SearchUser = (event) => {

  }

  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      size="small"
      fullWidth
      value={searchQuery}
      onChange={handleSearch}
      style={{ borderRadius : '5rem' }}
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
          width: '25rem',
          position: 'relative',
          alignSelf: 'end',
          borderRadius: '5rem',
        },
        inputProps: {
          style: {
            paddingLeft: '30px',
            borderRadius: '5rem',
          },
        },
        startAdornment: (
            <SearchIcon onClick={SearchUser}
            style={{
              color:'#5B3203',
              position: 'absolute',
              top: '50%',
              left: '1rem',
              transform: 'translateY(-50%)',
            }}
          />
        ),
      }}
    />
  );
};

export default SearchBar;
