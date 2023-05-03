import { getUserByUsername } from "../../services/user";
import { getBlogsByAuthorId } from "../../services/blog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleBlogCard from "../SingleBlogCard/SingleBlogCard";
import { ToastContainer, Zoom } from "react-toastify";
import PaginationBar from "../Pagination/Pagination";


export default function OwnBlogs({cookieUsername}) {
    const [blogList, setBlogList] = useState([]);
    const [authorId, setAuthorId] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const navigate = useNavigate();

    const changePageNumber = (page) => {
      setPageNumber(page);
    };

    useEffect(() => {
        async function getUser() {
            const user = await getUserByUsername(cookieUsername);
            console.log(cookieUsername);
            setAuthorId(user.data.id);
            await getAllBlgsByAuthorId(user.data.id, 1);
        }
        getUser();
    }, [cookieUsername]);

    const getAllBlgsByAuthorId = async (authorId, pageNumber) => {
      const userBlogs = await getBlogsByAuthorId(authorId, pageNumber);
      if(typeof(userBlogs.data) === 'object'){
          setBlogList(userBlogs.data);
      } else {
        setBlogList(null);
      }
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
          changePageNumber={changePageNumber}
          navigationPage={"profile"}
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