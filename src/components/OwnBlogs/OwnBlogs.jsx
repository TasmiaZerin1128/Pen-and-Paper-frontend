import { getUserByUsername } from "../../services/user";
import { getBlogsByAuthorId } from "../../services/blog";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { ToastContainer, Slide, Zoom } from "react-toastify";
import { editBlog, deleteBlog } from "../../services/blog";
import { showToast } from "../../services/toast";


function EditBlogs({blog, setBlogList}) {
  const [open, setOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(blog.title);
  const [editDescription, setEditDescription] = useState(blog.description);

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
        if(typeof(userBlogs) === 'object'){
            setBlogList(userBlogs.data);
        }
    } else {
      console.log(response.data);
    }
  }

  return (
    <div>
      <Button size="small" disableElevation variant="contained" style={{ backgroundColor: '#863812', marginRight: '0.5rem', marginBottom: '0.5rem'}} onClick={() => handleClickOpen()}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{backgroundColor: '#EBE4D2', color: '#863812', padding: '3rem'}}>
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

export default function OwnBlogs() {
    const [blogList, setBlogList] = useState([]);
    const [authorId, setAuthorId] = useState("");

    useEffect(() => {
        async function getUser() {
            let cookie = Cookies.get("jwt");
            let { username } = jwt_decode(cookie);
            const user = await getUserByUsername(username);
            setAuthorId(user.data.id);
            await getAllBlgsByAuthorId(user.data.id);
        }
        getUser();
    }, []);

    const deleteBlogs = async (blogId) => {
      const response = await deleteBlog(blogId);
      console.log(response.data);
      if(response.status === 200){
        showToast("Blog deleted", "deleted");
      }
      await getAllBlgsByAuthorId(authorId);
    }

    const getAllBlgsByAuthorId = async (authorId) => {
      const userBlogs = await getBlogsByAuthorId(authorId);
      if(typeof(userBlogs) === 'object'){
          setBlogList(userBlogs.data);
      }
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
      

    if(blogList) {
        return (
        <>
        <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#863812" }}/>
        <h4><a href="/dashboard" style={{ fontSize: '16px', color: '#863812', textDecoration: 'none', marginBottom: '2rem'}}>←  Go back to Dashboard</a></h4>
          {blogList.map((item) => (
            <Card className="blogCards" key={item.id}>
              <CardContent style={{ overflowWrap: "break-word" }}>
                <Typography
                  sx={{ fontSize: 14, fontFamily: "Poppins", display: "flex", alignItems: "center" }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.authorFullName}
                  <Typography sx={{ fontSize: 13, fontFamily: "Poppins", padding: "0" }} color="#863812">&nbsp;@{item.authorUsername}</Typography>
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
                  {item.title}
                </Typography>
                {formatTimestamp(item.updatedAt)}
                <div className="description">
                    {item.description}
                </div>
              </CardContent>
              <hr style={{border: '1px solid #e0d8c3'}} />
              <CardActions>
                <EditBlogs blog={item} setBlogList={setBlogList} />
                <Button size="small" variant="outlined" onClick={() => deleteBlogs(item.id)} style={{ borderColor: '#b11e1e', color: '#b11e1e', marginRight: '0.5rem', marginBottom: '0.5rem'}}>Delete</Button>
            </CardActions>
            </Card>
          ))}
        </>
      );
      } 
        return (
          <>
          <h1>No blog found</h1>
          </>
        )
}