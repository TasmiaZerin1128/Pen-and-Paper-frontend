import { DialogContentText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Contexts";
import { createBlog } from "../../services/blog";

import "../Navbar/Navbar.css";

export default function CreateBlog({ handleBlogAdd, showToast }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [serverError, setServerError] = useState("");
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);

  const { checkLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    if (checkLoggedIn()) {
      setOpen(true);
    } else navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const create = async () => {
    if (title.trim() && description.trim()) {
      const newBlog = {
        title: title,
        description: description,
      };
      const response = await createBlog(newBlog);
      if (String(response.status)[0] == 2) {
        showToast("Blog added to timeline", "newBlog");
        handleClose();
        handleBlogAdd();
        setErrorTitle(null);
        setErrorDescription(null);
      } else {
        setServerError(response.data);
      }
    } else {
      if (!title.trim()) {
        setErrorTitle("Title of the blog is required");
      } else {
        setErrorTitle(null);
      }
      if (!description.trim()) {
        setErrorDescription("Description cannot be blank");
      } else {
        setErrorDescription(null);
      }
    }
  };

  return (
    <div>
      <Button className="create" onClick={handleClickOpen}>
        + Create Blog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: "#EBE4D2",
            color: "#863812",
            paddingTop: "3rem",
            paddingLeft: "2.7rem",
            fontFamily: "Poppins",
          }}
        >
          <b>Create a New Blog</b>
        </DialogTitle>
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
            inputProps={{ style: { fontSize: 40 } }}
            sx={{ marginBottom: "1.4rem" }}
            onChange={(e) => setTitle(e.target.value)}
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
            inputProps={{ style: { fontSize: 18 } }}
            maxRows={8}
            minRows={8}
            onChange={(e) => setDescription(e.target.value)}
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
            onClick={handleClose}
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
            onClick={create}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
