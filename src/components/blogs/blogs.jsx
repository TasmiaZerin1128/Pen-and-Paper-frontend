import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { getAllBlogs } from "../../services/blog";

import "./blogs.css";

function formatTimestamp(timestamp) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  const formatted = new Date(timestamp).toLocaleString("en-US", options);
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

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const allBlogs = await getAllBlogs();
      console.log(allBlogs.data);
      setBlogs(allBlogs.data);
    }
    fetchBlogs();
  }, []);

  return (
    <>
      {blogs.map((item) => (
        <Card className="blogCards" key={item.id}>
          <CardContent style={{ overflowWrap: "break-word" }}>
            <Typography
              sx={{ fontSize: 14, fontFamily: "Poppins" }}
              color="text.secondary"
              gutterBottom
            >
              {item.authorFullName}
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

export default function BlogList() {
  return (
        <AllBlogs />
  );
}
