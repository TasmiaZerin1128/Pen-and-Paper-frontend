import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Contexts';

export default function SessionExpiredPopUp() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const { checkLoggedIn, setStatusSignedOut } = useContext(AuthContext);

  const handleClose = () => {
    setStatusSignedOut();
    setOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const status = checkLoggedIn();
    if(!status){
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '3rem'}}>
        <DialogTitle sx={{margin: 0, padding: 0}} id="alert-dialog-title">
          {"Your session has expired"}
        </DialogTitle>
          <DialogContentText id="alert-dialog-description">
            Please login again to continue using the app!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '0 3rem 3rem'}}>
          <Button variant='standard' style={{backgroundColor: '#863812', color: '#EBE4D2', padding: '0.6rem 1.5rem', borderRadius: '5px'}} onClick={handleClose}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}