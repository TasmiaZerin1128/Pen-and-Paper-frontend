import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavbarDashboard/NavbarDashboard";
import BlogList from "../../components/blogs/blogs";
import { showToast } from "../../services/toast";

import Navbar from "../../components/Navbar/navbar";
import PaginationBar from "../../components/Pagination/Pagination";
import { isLoggedIn } from "../../services/loggedIn";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";
import { getTokenUsername } from "../../services/loggedIn";
import "./dashboard.css";

export default function Dashboard() {
  const [blogAdded, setBlogAdded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [expired, setExpired] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (!isLoggedIn() || getTokenUsername() === "expired") {
      if(getTokenUsername() === "expired"){
        setExpired(true);
      } else {
        setExpired(false);
      }
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [isLoggedIn()]);

  const handleBlogAdd = () => {
    console.log("Working");
    setBlogAdded(!blogAdded);
  };

  const changePageNumber = (page) => {
    setPageNumber(page);
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
        <BlogList blogAdded={blogAdded} pageNumber={pageNumber} author={null} />
        <PaginationBar
          changePageNumber={changePageNumber}
          navigationPage={"dashboard"}
        />
      </div>
    </>
  );
}
