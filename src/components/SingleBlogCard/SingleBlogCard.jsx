import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { editBlog, deleteBlog } from "../../services/blog";
import { getBlogsByAuthorId } from "../../services/blog";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { showToast } from "../../services/toast";
import './SingleBlogCard.css';

import '../Blogs/Blogs.css';

function EditBlogs({blog, setBlogList}) {
    const [open, setOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(blog.title);
    const [editDescription, setEditDescription] = useState(blog.description);
    const [serverError, setServerError] = useState('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const edit = async () => {
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
          />
          </DialogContent>
          <DialogActions sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '0 3rem 3rem'}}>
            <Button sx={{backgroundColor: '#EBE4D2', color: '#863812'}} onClick={handleClose}>Cancel</Button>
            <Button style={{backgroundColor: '#863812', color: '#EBE4D2', padding: '0.6rem 1.5rem', borderRadius: '5px'}} onClick={edit}>Edit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
  function DeleteBlog({blog, setBlogList}) {
    const [open, setOpen] = useState(false);
    const [serverError, setServerError] = useState('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const confirmDelete = async () => {
      const response = await deleteBlog(blog.id);
        console.log(response.data);
        if(response.status === 200){
          handleClose();
          showToast("Blog deleted", "deleted");
          const userBlogs = await getBlogsByAuthorId(blog.authorId);
          console.log(userBlogs);
          if(typeof(userBlogs.data.rows) === 'object'){
              setBlogList(userBlogs.data.rows);
          }
        } else {
          setServerError(response.data);
          console.log(response.data);
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

function formatTimestamp(timestamp) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  };
  const formatted = new Date(timestamp).toLocaleString(undefined, options);
  return (
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {formatted}
    </Typography>
  );
}

function ReadMore({ blog, length = 400 }) {
  const [showLess, setShowLess] = useState(true);
  const text = blog.description;

  const navigate = useNavigate();
    const location = useLocation();

    const showBlog = () => {
      console.log("clicked on text");
        if(!location.state){
        navigate("/"+ blog.authorUsername + "/blogs/"+ blog.id, { state: { data: blog } });
        }
    }

    if (text.length < length) {
      return(
        <div>
          <span style={{whiteSpace: 'pre-line'}} onClick={() => showBlog()}>
            {text}
          </span>
        </div>);
    }

  return (
    <div style={{ textAlign: 'justify' }}>
        <span style={{whiteSpace: 'pre-line'}} onClick={() => showBlog()}>{showLess ? `${text.slice(0, length)}...` : text}</span>
      <button className="moreOrLess" onClick={() => setShowLess(!showLess)}>
        {showLess ? "Read more" : "Read less"}
      </button>
    </div>
  );
}

export default function SingleBlogCard({singleBlog, editMode, setSingleBlog}) {

    const navigate = useNavigate();

    return (
    <>
        <Card className="blogCards" key={singleBlog.id}>
          <CardContent style={{ overflowWrap: "break-word" }}>
            <Typography className="blogAuthor" onClick={() => navigate("/profile/"+ singleBlog.authorUsername)}
              sx={{ fontSize: 14, fontFamily: "Poppins", display: "inline-block", alignItems: "center" }}
              color="text.secondary"
              gutterBottom>
                {singleBlog.authorFullName}
                </Typography>
            <Typography className="blogAuthor" onClick={() => navigate("/profile/"+ singleBlog.authorUsername)} 
            sx={{ fontSize: 13, fontFamily: "Poppins", padding: "0", display: "inline-block", alignItems: "center" }} 
            color="#863812">
              &nbsp;@{singleBlog.authorUsername}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "#863812",
              }}
            >
              {singleBlog.title}
            </Typography>
            {formatTimestamp(singleBlog.updatedAt)}
            <div className="description">
              <ReadMore blog={singleBlog} />
            </div>
          </CardContent>
          { editMode ? 
          (<>
          <hr style={{border: '1px solid #e0d8c3'}} />
              <CardActions>
                <EditBlogs blog={singleBlog} setBlogList={setSingleBlog} />
                <DeleteBlog blog={singleBlog} setBlogList={setSingleBlog} />
              </CardActions>
            </>) : <></>}
        </Card>
    </>
  );
}
