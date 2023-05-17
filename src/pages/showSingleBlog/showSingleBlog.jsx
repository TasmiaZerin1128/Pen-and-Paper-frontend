import { useEffect } from "react";
import SingleBlogCard from "../../components/SingleBlogCard/SingleBlogCard";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import './showSingleBlog.css'

export default function ShowSingleBlog() {
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
          navigate("*");
        }

    }, [location]);

    return (
        <>
            <div style={{ padding: '3rem' }}>
                <h4 onClick={() => navigate(-1)} style={{ fontSize: '16px', color: '#863812', textDecoration: 'none', marginBottom: '2rem', cursor: 'pointer'}}>←  Go Back</h4>
                { location.state ? (<SingleBlogCard singleBlog={location.state.data} editMode={location.state.editMode}/>) : (<h1>No blog found</h1>) }
            </div>
        </>
    )
}