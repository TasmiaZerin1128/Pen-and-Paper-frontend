import { useEffect, useState } from "react";
import SingleBlogCard from "../SingleBlogCard/SingleBlogCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSearchParams } from "react-router-dom";

import { getAllBlogs, getBlogsByAuthorId } from "../../services/blog";

import "./BlogList.css";

export default function BlogList({
  blogAdded,
  setPageNumber,
  setPageSize,
  authorId,
  setBlogCount,
}) {
  const [blogs, setBlogs] = useState(null);

  const [searchParams] = useSearchParams();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const pgNo = searchParams.get("pagenumber");
    const pgSize = searchParams.get("pagesize");
    if (parseInt(pgNo) > 0 && pgNo !== "null") setPageNumber(pgNo);
    if (parseInt(pgSize) > 0 && pgSize !== "null") setPageSize(pgSize);

    fetchAllBlogs(pgNo, pgSize);
  }, [blogAdded, searchParams]);

  const fetchAllBlogs = async (pageNumber, pageSize) => {
    let allBlogs = null;

    if (authorId) {
      allBlogs = await getBlogsByAuthorId(authorId, pageNumber, pageSize);
    } else {
      allBlogs = await getAllBlogs(pageNumber, pageSize);
    }
    setLoading(false);
    if (allBlogs.data.count > 0) {
      setBlogs(allBlogs.data.rows);
    } else {
      setBlogs(null);
    }
    setBlogCount(allBlogs.data.count);
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <>
          {blogs ? (
            <>
              {blogs.map((item) => (
                <SingleBlogCard
                  key={item.id}
                  singleBlog={item}
                  editMode={false}
                />
              ))}
            </>
          ) : (
            <>
              <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
                No blog found
              </h1>
            </>
          )}
        </>
      )}
    </>
  );
}
