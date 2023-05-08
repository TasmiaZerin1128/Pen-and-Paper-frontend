import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavbarDashboard/NavbarDashboard";
import BlogList from "../../components/blogs/blogs";
import { showToast } from "../../services/toast";

import Navbar from "../../components/Navbar/navbar";
import PaginationBar from "../../components/Pagination/Pagination";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import "./dashboard.css";

export default function Dashboard({setProfileUsername}) {
  // const location = useLocation();
  
  const [blogAdded, setBlogAdded] = useState(false);
  const [blogCount, setBlogCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [signedIn, setSignedIn] = useState(false);

  const { checkLoggedIn, loggedInUsername, setExpired } = useContext(AuthContext);

  const changePage = (number) => {
    setPageNumber(number);
  };

  useEffect(() => {
    if(checkLoggedIn()){
      setProfileUsername(loggedInUsername);
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  const handleBlogAdd = () => {
    setBlogAdded(!blogAdded);
  };

  return (
    <>
    <div style={{ position: 'sticky', top: 0, zIndex: 100}}>
      {signedIn ? (
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
