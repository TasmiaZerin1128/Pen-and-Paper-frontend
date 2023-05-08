import { getUserByUsername } from "../../services/user";
import { getBlogsByAuthorId } from "../../services/blog";
import { useEffect, useState } from "react";
import SingleBlogCard from "../SingleBlogCard/SingleBlogCard";
import { ToastContainer, Zoom } from "react-toastify";
import PaginationBar from "../Pagination/Pagination";
import { useSearchParams } from "react-router-dom";


export default function OwnBlogs({cookieUsername}) {
    const [searchParams] = useSearchParams();

    const [blogList, setBlogList] = useState([]);
    const [authorId, setAuthorId] = useState("");
    const [blogCount, setBlogCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const changePageNumber = (page) => {
      if(page) setPageNumber(page);
    };

    useEffect(() => {
        window.scrollTo({ top: 0 });

        const pgNo = searchParams.get('pagenumber');
        const pgSize = searchParams.get('pagesize');
        if(pgNo && pgNo!== 'null') setPageNumber(pgNo);
        if(pgSize && pgSize!== 'null') setPageSize(pgSize);

        async function getUser() {
            const user = await getUserByUsername(cookieUsername);
            console.log(cookieUsername);
            setAuthorId(user.data.id);
            await getAllBlgsByAuthorId(user.data.id, pgNo, pgSize);
        }

        getUser();

    }, [cookieUsername, searchParams]);

    const getAllBlgsByAuthorId = async (authorId, pageNumber, pageSize) => {
      const userBlogs = await getBlogsByAuthorId(authorId, pageNumber, pageSize);
      if(userBlogs.data.count > 0){
          setBlogList(userBlogs.data.rows);
      } else {
        setBlogList(null);
      }
      setBlogCount(userBlogs.data.count);
    }      

    if(blogList) {
        return (
        <>
        <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#168030" }}/>
        <h4><a href="/dashboard" style={{ fontSize: '16px', color: '#863812', textDecoration: 'none', marginBottom: '2rem'}}>←  Go back to Dashboard</a></h4>
          {blogList.map((item) => (
              <SingleBlogCard key={item.id} singleBlog={item} editMode={true} setSingleBlog={setBlogList}/>
          ))}
        <PaginationBar
          changePage={changePageNumber} pageSize={pageSize} pageNumber={pageNumber} blogCount={blogCount}
        />
        </>
      );
      } 
        return (
          <>
          <h4><a href="/dashboard" style={{ fontSize: '16px', color: '#863812', textDecoration: 'none', marginBottom: '2rem'}}>←  Go back to Dashboard</a></h4>
          <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>No blog found</h1>
          </>
        )
}