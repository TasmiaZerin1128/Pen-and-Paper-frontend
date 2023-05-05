import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavbarDashboard/NavbarDashboard";
import BlogList from "../../components/blogs/blogs";
import { showToast } from "../../services/toast";

import Navbar from "../../components/Navbar/navbar";
import PaginationBar from "../../components/Pagination/Pagination";
import { isLoggedIn } from "../../services/loggedIn";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";
import { getTokenUsername } from "../../services/loggedIn";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import "./dashboard.css";

export default function Dashboard() {
  // const location = useLocation();
  
  const [blogAdded, setBlogAdded] = useState(false);
  const [blogCount, setBlogCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [expired, setExpired] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { isSignedIn, loggedInUsername } = useContext(AuthContext);

  const changePage = (number) => {
    setPageNumber(number);
  };

  useEffect(() => {
    console.log(loggedInUsername);
    if (isSignedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

  }, [isSignedIn]);

  const handleBlogAdd = () => {
    console.log("Working");
    setBlogAdded(!blogAdded);
  };

  return (
    <>
    <div style={{ position: 'sticky', top: 0, zIndex: 100}}>
    {/* {expired ? (<ErrorPopUp loggedIn={loggedIn}/>) : null} */}
      {isSignedIn ? (
        <NavbarDashboard handleBlogAdd={handleBlogAdd} />
      ) : (
        <Navbar />
      )}
      </div>
      <div className="dashboard">
        <h1 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
          <u>Recent Blogs</u>
        </h1>
        <BlogList blogAdded={blogAdded} setPageNumber={setPageNumber} setPageSize={setPageSize} setBlogCount={setBlogCount}/>
        <PaginationBar
          changePage={changePage} pageSize={pageSize} pageNumber={pageNumber} blogCount={blogCount}
        />
      </div>
    </>
  );
}
