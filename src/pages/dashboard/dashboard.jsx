import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavbarDashboard/NavbarDashboard";
import BlogList from "../../components/blogs/blogs";
import { showToast } from "../../services/toast";

import Navbar from "../../components/Navbar/navbar";
import PaginationBar from "../../components/Pagination/Pagination";
import { isLoggedIn } from "../../services/loggedIn";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";
import { getTokenUsername } from "../../services/loggedIn";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  // const location = useLocation();
  
  const [blogAdded, setBlogAdded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [expired, setExpired] = useState(false);
  const [pageNumber, setPageNumber] = useState(null);
  const [pageSize, setPageSize] = useState(null);


  const changePage = (number) => {
    if(number) setPageNumber(number);
  };

  useEffect(() => {
    if (!isLoggedIn() || getTokenUsername() === "expired") {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }

    const pgNo = searchParams.get('pagenumber');
    console.log("Page number: " + pgNo);
    const pgSize = searchParams.get('pagesize');
    console.log("Page Size: " + pgSize);
    if(pgNo) setPageNumber(pgNo);
    if(pgSize) setPageSize(pgSize);

  }, [isLoggedIn()]);

  const handleBlogAdd = () => {
    console.log("Working");
    setBlogAdded(!blogAdded);
  };

  return (
    <>
    <div style={{ position: 'sticky', top: 0, zIndex: 100}}>
    {expired ? (<ErrorPopUp loggedIn={loggedIn}/>) : null}
      {loggedIn ? (
        <NavbarDashboard handleBlogAdd={handleBlogAdd} />
      ) : (
        <Navbar />
      )}
      </div>
      <div className="dashboard">
        <h1 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
          <u>Recent Blogs</u>
        </h1>
        <BlogList blogAdded={blogAdded} pageNumber={pageNumber} pageSize={pageSize} author={null} />
        <PaginationBar
          changePage={changePage} pageSize={pageSize} pageNumber={pageNumber}
        />
      </div>
    </>
  );
}
