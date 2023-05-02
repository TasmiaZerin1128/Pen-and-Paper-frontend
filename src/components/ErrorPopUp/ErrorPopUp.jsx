import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/loggedIn';

export default function ErrorPopUp({loggedIn}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(loggedIn) setOpen(false);
    else setOpen(true);
  }, [loggedIn]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <DialogTitle id="alert-dialog-title">
          {"Your session has expired"}
        </DialogTitle>
          <DialogContentText id="alert-dialog-description">
            Please login again to continue using the app!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='standard' onClick={handleClose}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}