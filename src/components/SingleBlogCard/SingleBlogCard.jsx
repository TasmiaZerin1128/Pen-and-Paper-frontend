import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../services/toast";
import "../BlogList/BlogList.css";
import DeleteBlog from "../DeleteBlog/DeleteBlog";
import EditBlog from "../EditBlog/EditBlog";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import "./SingleBlogCard.css";

function formatTimestamp(timestamp) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formatted = new Date(timestamp).toLocaleString(undefined, options);
  return (
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {formatted}
    </Typography>
  );
}

function ReadMore({ blog, length = 400, editMode }) {
  const [showLess, setShowLess] = useState(true);
  const text = blog.description;

  const navigate = useNavigate();
  const location = useLocation();

  const { loggedInUsername } = useContext(AuthContext);

  const showBlog = () => {
    if (!location.state) {
      if(blog.authorUsername === loggedInUsername) editMode = true;
      else editMode = false;
      navigate(`/blogs/${blog.id}`, { state: { data: blog, editMode: editMode }});
    }
  };

  if (text.length < length) {
    return (
      <div>
        <span style={{ whiteSpace: "pre-line" }} onClick={() => showBlog()}>
          {text}
        </span>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "justify" }}>
      <span style={{ whiteSpace: "pre-line" }} onClick={() => showBlog()}>
        {showLess ? `${text.slice(0, length)}...` : text}
      </span>
      <button className="moreOrLess" onClick={() => setShowLess(!showLess)}>
        {showLess ? "Read more" : "Read less"}
      </button>
    </div>
  );
}

export default function SingleBlogCard({
  singleBlog,
  editMode,
  setBlogList,
  showSingle,
  setBlog
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [oneBlog, setOneBlog] = useState(singleBlog);
  const { loggedInUsername } = useContext(AuthContext);

  useEffect(() => {
    setOneBlog(singleBlog);
  }, [singleBlog]);

  const showBlog = () => {
    if (!location.state) {
      if(singleBlog.authorUsername === loggedInUsername) editMode = true;
      else editMode = false;
      navigate(`/blogs/${singleBlog.id}`, { state: { data: singleBlog, editMode: editMode } });
    }
  };

  return (
    <>
      <Card className="blogCards" key={oneBlog.id}>
        <CardContent style={{ overflowWrap: "break-word" }}>
          <Typography
            className="blogAuthor"
            style={{
              fontFamily: "Poppins",
              display: "inline-block",
              alignItems: "center",
            }}
            onClick={() => navigate(`/profile/${oneBlog.authorUsername}`)}
            gutterBottom
          >
            <span style={{ fontSize: 14, color: "#555558" }}>
              {oneBlog.authorFullName}
            </span>
            <span style={{ fontSize: 13, padding: "0", color: "#863812" }}>
              &nbsp;@{oneBlog.authorUsername}
            </span>
          </Typography>
          <Typography
            variant="h5"
            component="div"
            onClick={() => showBlog()}
            style={{
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#863812",
            }}
          >
            {oneBlog.title}
          </Typography>
          {formatTimestamp(oneBlog.updatedAt)}
          <div className="description">
            <ReadMore blog={oneBlog} editMode={editMode} />
          </div>
        </CardContent>
        {editMode && (
          <>
            <hr style={{ border: "1px solid #e0d8c3" }} />
            <CardActions>
              <EditBlog
                blog={oneBlog}
                setBlogList={setBlogList}
                showToast={showToast}
                setOneBlog={setOneBlog}
              />
              <DeleteBlog
                blog={oneBlog}
                setBlogList={setBlogList}
                showToast={showToast}
                showSingle={showSingle}
                setBlog={setBlog}
              />
            </CardActions>
          </>
        )}
      </Card>
    </>
  );
}
