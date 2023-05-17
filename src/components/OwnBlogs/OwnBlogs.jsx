import { getUserByUsername } from "../../services/user";
import { getBlogsByAuthorId } from "../../services/blog";
import { useEffect, useState } from "react";
import SingleBlogCard from "../SingleBlogCard/SingleBlogCard";
import { ToastContainer, Zoom } from "react-toastify";
import PaginationBar from "../Pagination/Pagination";
import { Loading } from "../Loading/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function OwnBlogs({ cookieUsername }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [blogList, setBlogList] = useState(null);
  const [authorId, setAuthorId] = useState("");
  const [blogCount, setBlogCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [isLoading, setLoading] = useState(true);

  const location = useLocation();

  const changePageNumber = (page) => {
    if (page) setPageNumber(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    const pgNo = searchParams.get("pagenumber");
    const pgSize = searchParams.get("pagesize");
    if (parseInt(pgNo) > 0 && pgNo !== "null") setPageNumber(pgNo);
    if (parseInt(pgSize) > 0 && pgSize !== "null") setPageSize(pgSize);

    if(location.state){
      showToast(location.state.data);
      location.state = null;
    }
    getUser(pgNo, pgSize);
  }, [cookieUsername, searchParams]);

  async function getUser(pgNo, pgSize) {
    const user = await getUserByUsername(cookieUsername);
    setAuthorId(user.data.id);
    await getAllBlgsByAuthorId(user.data.id, pgNo, pgSize);
  }

  const getAllBlgsByAuthorId = async (authorId, pageNumber, pageSize) => {
    const userBlogs = await getBlogsByAuthorId(authorId, pageNumber, pageSize);
    if( userBlogs.data.count === 0) {
      setBlogList(null);
    } else {
      setBlogList(userBlogs.data.rows);
    }
    setLoading(false);
    setBlogCount(userBlogs.data.count);
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#168030" }}/>
      <h4 onClick={()=> navigate("/dashboard")} style={{ fontSize: '16px', color: '#863812', cursor: 'pointer', marginBottom: '2rem'}}>←  Go back to Dashboard</h4>
      {blogList ? (
        <>
          {blogList.map((item) => (
            <SingleBlogCard key={item.id} singleBlog={item} editMode={true} setBlogList={setBlogList} showSingle={false}/>
          ))}
          <PaginationBar
            changePage={changePageNumber} pageSize={pageSize} pageNumber={pageNumber} blogCount={blogCount}
          />
        </>
        ) : (
          <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>No blog found</h1>
        )}
    </>
  )
}
