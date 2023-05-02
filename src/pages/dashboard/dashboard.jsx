import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavbarDashboard/NavbarDashboard";
import BlogList from "../../components/blogs/blogs";
import { showToast } from "../../services/toast";

import Navbar from "../../components/Navbar/navbar";
import PaginationBar from "../../components/Pagination/Pagination";
import { isLoggedIn } from "../../services/loggedIn";
import { ToastContainer, Zoom } from "react-toastify";
import "./dashboard.css";

export default function Dashboard() {
  const [blogAdded, setBlogAdded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (isLoggedIn()) {
      setLoggedIn(true);
    } else {
      showToast("Session Expired! Please Log In again","sessionexpired" );
    }
  }, [loggedIn]);

  const handleBlogAdd = () => {
    console.log("Working");
    setBlogAdded(!blogAdded);
  };

  const changePageNumber = (page) => {
    setPageNumber(page);
  };

  return (
    <>
    <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#4fb677" }}/>
      {loggedIn ? (
        <NavbarDashboard handleBlogAdd={handleBlogAdd} />
      ) : (
        <Navbar />
      )}
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
