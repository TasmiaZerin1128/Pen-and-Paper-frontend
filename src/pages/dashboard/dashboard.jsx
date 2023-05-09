import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BlogList from "../../components/blogs/blogs";

import { useContext } from "react";
import PaginationBar from "../../components/Pagination/Pagination";
import { AuthContext } from "../../contexts/Contexts";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard({ setProfileUsername }) {
  // const location = useLocation();

  const [blogAdded, setBlogAdded] = useState(false);
  const [blogCount, setBlogCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { checkLoggedIn, loggedInUsername } = useContext(AuthContext);

  const changePage = (number) => {
    setPageNumber(number);
  };

  useEffect(() => {
    if (checkLoggedIn()) {
      setProfileUsername(loggedInUsername);
    } 
  }, []);

  const handleBlogAdd = () => {
    setBlogAdded(!blogAdded);
  };

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Navbar handleBlogAdd={handleBlogAdd} />
      </div>
      <div className="dashboard">
        <h1 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
          <u>Recent Blogs</u>
        </h1>
        <BlogList
          blogAdded={blogAdded}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setBlogCount={setBlogCount}
        />
        <PaginationBar
          changePage={changePage}
          pageSize={pageSize}
          pageNumber={pageNumber}
          blogCount={blogCount}
        />
      </div>
    </>
  );
}
