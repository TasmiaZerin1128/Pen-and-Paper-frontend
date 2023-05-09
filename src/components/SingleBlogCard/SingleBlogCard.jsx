import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../services/toast";
import DeleteBlog from "../DeleteBlog/DeleteBlog";
import EditBlog from "../EditBlog/EditBlog";
import './SingleBlogCard.css';
import '../Blogs/Blogs.css';

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
        if(!location.state){
        navigate(`/blogs/${blog.id}`, { state: { data: blog } });
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
    const location = useLocation();

    const showBlog = () => {
      if(!location.state){
        navigate(`/blogs/${singleBlog.id}`, { state: { data: singleBlog } });
      }
    }

    return (
    <>
        <Card className="blogCards" key={singleBlog.id}>
          <CardContent style={{ overflowWrap: "break-word" }}>
            <Typography 
              className="blogAuthor" 
              style={{ fontFamily: "Poppins", display: "inline-block", alignItems: "center" }} 
              onClick={() => navigate(`/profile/${singleBlog.authorUsername}`)}
              gutterBottom>
                <span style={{ fontSize: 14, color: "#555558" }} >{singleBlog.authorFullName}</span>
                <span style={{ fontSize: 13, padding: "0", color: "#863812"}}>&nbsp;@{singleBlog.authorUsername}</span>
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
                <EditBlog blog={singleBlog} setBlogList={setSingleBlog} showToast={showToast}/>
                <DeleteBlog blog={singleBlog} setBlogList={setSingleBlog} showToast={showToast} />
              </CardActions>
            </>) : <></>}
        </Card>
    </>
  );
}
