import { useEffect, useState } from "react";
import SingleBlogCard from "../SingleBlogCard/SingleBlogCard";
import { useNavigate } from "react-router-dom";

import { getAllBlogs, getBlogsByAuthorId } from "../../services/blog";

import './Blogs.css';

export default function BlogList({blogAdded, pageNumber, pageSize, authorId}) {
  const [blogs, setBlogs] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    // console.log(pageNumber);
    console.log(pageNumber+ " "+ pageSize);
    fetchAllBlogs(pageNumber, pageSize);
  }, [blogAdded, pageNumber, pageSize]);

  const fetchAllBlogs = async (pageNumber, pageSize) => {
    let allBlogs = null;

    if(authorId){
      allBlogs = await getBlogsByAuthorId(authorId, pageNumber, pageSize);
    } else {
      allBlogs = await getAllBlogs(pageNumber, pageSize);
    }
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
          <SingleBlogCard key={item.id} singleBlog={item} editMode={false} />
      ))}
    </>
  );
  } 
    return (
      <>
      <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>No blog found</h1>
      </>
    )
}
