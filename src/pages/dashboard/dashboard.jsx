import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavbarDashboard/NavbarDashboard";
import BlogList from "../../components/Blogs/Blogs";

import "./dashboard.css";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar/navbar";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationRounded({changePageNumber}) {

  const pageNumber = (e) => {
    changePageNumber(e.target.textContent);
  }

  return (
    <Stack spacing={2}>
      <Pagination style={{marginTop: "1rem"}} count={10} shape="rounded" onChange={(e) => pageNumber(e)}/>
    </Stack>
  );
}

export default function Dashboard() {
      
  const [blogAdded, setBlogAdded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    let cookie = Cookies.get('jwt');
    if(cookie){
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleBlogAdd = () => {
    console.log("Working");
    setBlogAdded(!blogAdded);
  }

  const changePageNumber = (page) => {
    setPageNumber(page);
  }

  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber]);
  
  return (
    <>
    { isLoggedIn? (<NavbarDashboard handleBlogAdd={handleBlogAdd}/>) : (<Navbar />) }
      <div className="dashboard">
        <h1 style={{fontSize:'1.5rem', marginBottom: '2rem'}}><u>Recent Blogs</u></h1>
        <BlogList blogAdded={blogAdded} pageNumber={pageNumber} author={null}/>
        <PaginationRounded changePageNumber={changePageNumber}/>
      </div>
    </>
  );
}
