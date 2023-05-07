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
  const [expired, setExpired] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [username, setUsername] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  const { isSignedIn, loggedInUsername } = useContext(AuthContext);

  const changePage = (number) => {
    setPageNumber(number);
  };

  useEffect(() => {
    console.log(loggedInUsername);
    if(isSignedIn){
      setProfileUsername(loggedInUsername);
      setUsername(loggedInUsername);
      setSignedIn(true);
    } else {
      setUsername('');
      setSignedIn(false);
    }
  }, []);

  const handleBlogAdd = () => {
    console.log("Working");
    setBlogAdded(!blogAdded);
  };

  return (
    <>
    <div style={{ position: 'sticky', top: 0, zIndex: 100}}>
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
