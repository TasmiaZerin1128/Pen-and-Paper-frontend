import { useState } from "react";
import { editBlog } from "../../services/blog";
import { getBlogsByAuthorId } from "../../services/blog";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import '../SingleBlogCard/SingleBlogCard.css';
import '../Blogs/Blogs.css';

export default function EditBlog({blog, setBlogList, showToast}) {
    const [open, setOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(blog.title);
    const [editDescription, setEditDescription] = useState(blog.description);
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorLineTitle, setErrorLineTitle] = useState("");
    const [errorLineDescription, setErrorLineDescription] = useState("");
    const [serverError, setServerError] = useState('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const cancel = () => {
        setEditTitle(blog.title);
        setEditDescription(blog.description);
        setErrorTitle(false);
        setErrorLineTitle("");
        setErrorDescription(false);
        setErrorLineDescription("");
        handleClose();
    }
  
    const edit = async () => {
      if(editTitle.trim() && editDescription.trim()){
      const editedBlog = {
        title: editTitle,
        description: editDescription
      };
      const response = await editBlog(blog.id, editedBlog);
      console.log(response.data);
      if(response.status === 200){
          handleClose();
          showToast("Blog updated", "blogUpdated");
          const userBlogs = await getBlogsByAuthorId(blog.authorId);
          console.log(userBlogs);
          if(typeof(userBlogs.data) === 'object'){
              setBlogList(userBlogs.data.rows);
          }
      } else {
        setServerError(response.data);
        console.log(response.data);
      }
    } else {
      if(!editTitle.trim()){
        setErrorTitle(true);
        setErrorLineTitle("Title of the blog is required");
      } else {
        setErrorTitle(false);
        setErrorLineTitle("");
      }
      if(!editDescription.trim()){
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
        <Button size="small" disableElevation variant="contained" style={{ backgroundColor: '#863812', marginRight: '0.5rem', marginBottom: '0.5rem'}} onClick={() => handleClickOpen()}>Edit</Button>
        <Dialog open={open} onClose={handleClose}>
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
              value={editTitle}
              inputProps={{style: {fontSize: 40}}}
              sx={{marginBottom: '1.4rem'}}
              onChange={(e) => setEditTitle(e.target.value)}
              error={errorTitle} helperText={errorLineTitle}
            />
            <TextField
            id="body"
            label="Description"
            type="text"
            multiline
            fullWidth
            variant="outlined"
            value={editDescription}
            inputProps={{style: {fontSize: 18}}}
            maxRows={8}
            minRows={8}
            onChange={(e) => setEditDescription(e.target.value)}
            error={errorDescription} helperText={errorLineDescription}
          />
          </DialogContent>
          <DialogActions sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '0 3rem 3rem'}}>
            <Button sx={{backgroundColor: '#EBE4D2', color: '#863812'}} onClick={cancel}>Cancel</Button>
            <Button style={{backgroundColor: '#863812', color: '#EBE4D2', padding: '0.6rem 1.5rem', borderRadius: '5px'}} onClick={edit}>Edit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }