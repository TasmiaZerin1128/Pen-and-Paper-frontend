import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogContentText } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteUserByUsername } from '../../services/user';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Contexts';
import './DeleteAccount.css';

function DeleteConfirm({cookieUsername}) {
    const [open, setOpen] = useState(false);
    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    const { setStatusSignedOut } = useContext(AuthContext);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const deleteUserAccount = async () => {
        const response = await deleteUserByUsername(cookieUsername);
        if(response.status === 200) {
            Cookies.remove("jwt");
            setStatusSignedOut();
            handleClose();
            navigate("/login", { state: { message: "Account has been deleted" } });
        } else {
            setServerError(response.data);
        }
        
    }
  
    return (
      <div>
        <Button disableElevation variant='contained' className="deleteButton" onClick={() => handleClickOpen()}>Delete Account</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '3rem'}}>
          <DialogTitle id="alert-dialog-title" sx={{margin: 0, padding: 0}}>
            <b><h3>Confirm Delete</h3></b>
          </DialogTitle>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete your account? You cannot undo this action
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description" sx={{ color: '#b11e1e'}}>
            {serverError}
          </DialogContentText>
          </DialogContent>
          <DialogActions sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '0 3rem 3rem'}}>
            <Button sx={{backgroundColor: '#EBE4D2', color: '#863812'}} onClick={handleClose}>Cancel</Button>
            <Button style={{backgroundColor: '#863812', color: '#EBE4D2', padding: '0.6rem 1.5rem', borderRadius: '5px'}} onClick={deleteUserAccount}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default function DeleteAccount({cookieUsername}) {

  const navigate = useNavigate();
  
  return (
    <>
    <div className="deleteSection">
        <h1 style={{margin: 0}}>Delete Your Account</h1>
        <p>Deleting you account will remove all of your information from our database. This cannot be undone.</p>
        <div className="buttons" style={{ display: 'flex', flexDirection: 'row' }}>
            <Button disableElevation variant='outlined' className="cancelButton" onClick={() => navigate("/dashboard")}>Cancel</Button>
            <DeleteConfirm cookieUsername={cookieUsername}/>
        </div>
    </div>
    </>
  );
}