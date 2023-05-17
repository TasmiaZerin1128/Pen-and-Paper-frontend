import { useState } from "react";
import { deleteBlog } from "../../services/blog";
import { getBlogsByAuthorId } from "../../services/blog";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, useLocation } from "react-router-dom";

export default function DeleteBlog({blog, setBlogList, showToast, showSingle, setBlog}) {
    const [open, setOpen] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const confirmDelete = async () => {
      const response = await deleteBlog(blog.id);
        if(response.status === 200){
          handleClose();
          showToast("Blog deleted", "deleted");
          if(showSingle){
            location.state = null;
            setBlog(null);
          } else {
          const userBlogs = await getBlogsByAuthorId(blog.authorId);
          if(userBlogs.data.count > 0){
              setBlogList(userBlogs.data.rows);
          } else setBlogList(null);
        }
        } else {
          setServerError(response.data);
      }
    }
  
    return (
      <div>
        <Button size="small" disableElevation variant="outlined" style={{ borderColor: '#b11e1e', color: '#b11e1e', marginRight: '0.5rem', marginBottom: '0.5rem'}} onClick={() => handleClickOpen()}>Delete</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '3rem'}}>
          <DialogTitle id="alert-dialog-title" sx={{margin: 0, padding: 0}}>
            <b><h3>Confirm Delete</h3></b>
          </DialogTitle>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete the blog? You cannot undo this action
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description" sx={{ color: '#b11e1e'}}>
            {serverError}
          </DialogContentText>
          </DialogContent>
          <DialogActions sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '0 3rem 3rem'}}>
            <Button sx={{backgroundColor: '#EBE4D2', color: '#863812'}} onClick={handleClose}>Cancel</Button>
            <Button style={{backgroundColor: '#863812', color: '#EBE4D2', padding: '0.6rem 1.5rem', borderRadius: '5px'}} onClick={confirmDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }