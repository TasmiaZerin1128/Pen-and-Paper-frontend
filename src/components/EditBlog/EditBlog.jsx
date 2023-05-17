import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { editBlog, getBlogsByAuthorId } from "../../services/blog";
import "../BlogList/BlogList.css";

export default function EditBlog({ blog, setBlogList, showToast, setOneBlog }) {
  const [open, setOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(blog.title);
  const [editDescription, setEditDescription] = useState(blog.description);
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [serverError, setServerError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancel = () => {
    setEditTitle(blog.title);
    setEditDescription(blog.description);
    setErrorTitle(null);
    setErrorDescription(null);
    handleClose();
  };

  const edit = async () => {
    if (editTitle.trim() && editDescription.trim()) {
      const editedBlog = {
        title: editTitle,
        description: editDescription,
      };
      const response = await editBlog(blog.id, editedBlog);
      if (response.status === 200) {
        handleClose();
        showToast("Blog updated", "blogUpdated");
        setOneBlog(response.data);
        if(setBlogList){
        const userBlogs = await getBlogsByAuthorId(blog.authorId);
        if (userBlogs.data.count > 0) {
          setBlogList(userBlogs.data.rows);
        } else {
          setBlogList(null);
        }
      }
      } else {
        setServerError(response.data);
      }
    } else {
      if (!editTitle.trim()) {
        setErrorTitle("Title of the blog is required");
      } else {
        setErrorTitle(null);
      }
      if (!editDescription.trim()) {
        setErrorDescription("Description cannot be blank");
      } else {
        setErrorDescription(null);
      }
    }
  };

  return (
    <div>
      <Button
        size="small"
        disableElevation
        variant="contained"
        style={{
          backgroundColor: "#863812",
          marginRight: "0.5rem",
          marginBottom: "0.5rem",
        }}
        onClick={() => handleClickOpen()}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ backgroundColor: "#EBE4D2", padding: "3rem" }}>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ color: "#b11e1e" }}
          >
            {serverError}
          </DialogContentText>
          <TextField
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={editTitle}
            inputProps={{ style: { fontSize: 40 } }}
            sx={{ marginBottom: "1.4rem" }}
            onChange={(e) => setEditTitle(e.target.value)}
            error={errorTitle ? true : false}
            helperText={errorTitle}
          />
          <TextField
            id="body"
            label="Description"
            type="text"
            multiline
            fullWidth
            variant="outlined"
            value={editDescription}
            inputProps={{ style: { fontSize: 18 } }}
            maxRows={8}
            minRows={8}
            onChange={(e) => setEditDescription(e.target.value)}
            error={errorDescription ? true : false}
            helperText={errorDescription}
          />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#EBE4D2",
            color: "#863812",
            padding: "0 3rem 3rem",
          }}
        >
          <Button
            sx={{ backgroundColor: "#EBE4D2", color: "#863812" }}
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#863812",
              color: "#EBE4D2",
              padding: "0.6rem 1.5rem",
              borderRadius: "5px",
            }}
            onClick={edit}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
