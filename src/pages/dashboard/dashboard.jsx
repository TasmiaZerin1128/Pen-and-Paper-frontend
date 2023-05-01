import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavbarDashboard/NavbarDashboard";
import BlogList from "../../components/Blogs/Blogs";

import "./dashboard.css";
import Navbar from "../../components/navbar/navbar";
import PaginationBar from "../../components/Pagination/Pagination";
import { isLoggedIn } from "../../services/loggedIn";

export default function Dashboard() {
      
  const [blogAdded, setBlogAdded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if(isLoggedIn()){
      setLoggedIn(true);
    }
  }, [loggedIn]);

  const handleBlogAdd = () => {
    console.log("Working");
    setBlogAdded(!blogAdded);
  }

  const changePageNumber = (page) => {
    setPageNumber(page);
  }
  
  return (
    <>
    { loggedIn? (<NavbarDashboard handleBlogAdd={handleBlogAdd}/>) : (<Navbar />) }
      <div className="dashboard">
        <h1 style={{fontSize:'1.5rem', marginBottom: '2rem'}}><u>Recent Blogs</u></h1>
        <BlogList blogAdded={blogAdded} pageNumber={pageNumber} author={null}/>
        <PaginationBar changePageNumber={changePageNumber} navigationPage={'dashboard'}/>
      </div>
    </>
  );
}
