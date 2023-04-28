import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavbarDashboard/NavbarDashboard";
import BlogList from "../../components/blogs/blogs";

import "./dashboard.css";

export default function Dashboard() {
      
  const [blogAdded, setBlogAdded] = useState(false);

  const handleBlogAdd = () => {
    console.log("Working");
    setBlogAdded(!blogAdded);
  }
  
  return (
    <>
      <NavbarDashboard handleBlogAdd={handleBlogAdd}/>
      <div className="dashboard">
        <h1 style={{fontSize:'1.5rem', marginBottom: '2rem'}}><u>Recent Blogs</u></h1>
        <BlogList blogAdded={blogAdded}/>
      </div>
    </>
  );
}