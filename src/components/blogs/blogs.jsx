import { useEffect, useState } from "react";
import SingleBlogCard from "../SingleBlogCard/SingleBlogCard";
import { useNavigate } from "react-router-dom";

import { getAllBlogs, getBlogsByAuthorId } from "../../services/blog";

import './Blogs.css';

function AllBlogs({blogAdded, pageNumber, authorId}) {
  const [blogs, setBlogs] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    console.log(pageNumber);
    fetchAllBlogs(pageNumber);
  }, [blogAdded, pageNumber]);

  const fetchAllBlogs = async (pageNumber) => {
    let allBlogs = null;

    console.log(authorId);

    if(authorId){
      allBlogs = await getBlogsByAuthorId(authorId);
    } else {
      allBlogs = await getAllBlogs(pageNumber);
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

export default function BlogList({blogAdded, pageNumber, authorId}) {
  return (
        <AllBlogs blogAdded={blogAdded} pageNumber={pageNumber} authorId={authorId}/>
  );
}
