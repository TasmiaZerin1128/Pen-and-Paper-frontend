import { useEffect, useState } from "react";
import SingleBlogCard from "../../components/SingleBlogCard/SingleBlogCard";
import { ToastContainer, Zoom } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import './showSingleBlog.css'

export default function ShowSingleBlog() {
    const location = useLocation();
    const [blog, setBlog] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
          navigate("*");
        }
        setBlog(location.state.data);
    }, [location]);

    return (
        <>
            <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#168030" }}/>
            <div style={{ padding: '3rem' }}>
                <h4 onClick={() => navigate(-1)} style={{ fontSize: '16px', color: '#863812', textDecoration: 'none', marginBottom: '2rem', cursor: 'pointer'}}>←  Go Back</h4>
                { blog ? (<SingleBlogCard singleBlog={location.state.data} editMode={location.state.editMode} showSingle={true} setBlog={setBlog}/>) : (<h1 style={{textAlign: 'center'}}>No blog found</h1>) }
            </div>
        </>
    )
}