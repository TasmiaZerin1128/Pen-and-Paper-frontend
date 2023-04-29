import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { getAllBlogs } from "../../services/blog";

import './Blogs.css';

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

function ReadMore({ text, length = 400 }) {
  const [showLess, setShowLess] = useState(true);

  if (text.length < length) {
    return <div>{text}</div>;
  }

  return (
    <div>
      {showLess ? `${text.slice(0, length)}...` : text}
      <button className="moreOrLess" onClick={() => setShowLess(!showLess)}>
        {showLess ? "Read more" : "Read less"}
      </button>
    </div>
  );
}

function AllBlogs({blogAdded, pageNumber}) {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetchAllBlogs(pageNumber);
  }, [blogAdded]);

  useEffect(() => {
    console.log(pageNumber);
    fetchAllBlogs(pageNumber);
  }, [pageNumber]);

  const fetchAllBlogs = async (pageNumber) => {
    const allBlogs = await getAllBlogs(pageNumber);
    console.log(allBlogs.data);
    if(typeof(allBlogs.data) === 'object'){
      setBlogs(allBlogs.data);
    } else {
      setBlogs(null);
    }
  }

  if(blogs) {
    return (
    <>
      {blogs.map((item) => (
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
              <ReadMore text={item.description} />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
  } 
    return (
      <>
      <h1 style={{ marginBottom: "1rem" }}>No blog found</h1>
      </>
    )
  
}

export default function BlogList({blogAdded, pageNumber}) {
  return (
        <AllBlogs blogAdded={blogAdded} pageNumber={pageNumber}/>
  );
}
