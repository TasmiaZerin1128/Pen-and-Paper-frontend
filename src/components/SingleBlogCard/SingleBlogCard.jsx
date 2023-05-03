import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

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

function ReadMore({ text, length = 400 }) {
  const [showLess, setShowLess] = useState(true);

  if (text.length < length) {
    return <div>{text}</div>;
  }

  return (
    <div style={{ textAlign: 'justify' }}>
      {showLess ? `${text.slice(0, length)}...` : text}
      <button className="moreOrLess" onClick={() => setShowLess(!showLess)}>
        {showLess ? "Read more" : "Read less"}
      </button>
    </div>
  );
}

export default function SingleBlog({singleBlog}) {

    return (
    <>
        <Card className="blogCards" key={singleBlog.id}>
          <CardContent style={{ overflowWrap: "break-word" }}>
            <Typography
              sx={{ fontSize: 14, fontFamily: "Poppins", display: "inline-block", alignItems: "center" }}
              color="text.secondary"
              gutterBottom>
                {singleBlog.authorFullName}
                </Typography>
            <Typography sx={{ fontSize: 13, fontFamily: "Poppins", padding: "0", display: "inline-block", alignItems: "center" }} color="#863812">
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
              <ReadMore text={singleBlog.description} />
            </div>
          </CardContent>
        </Card>
    </>
  );
}
