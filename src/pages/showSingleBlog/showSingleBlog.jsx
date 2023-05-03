import { useEffect, useState } from "react";
import SingleBlog from "../../components/SingleBlogCard/SingleBlogCard";
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
                <Button variant="text" className="goBackButton" onClick={()=> navigate(-1)}>
                    <h4 style={{ fontSize: '16px', color: '#863812', textDecoration: 'none', marginBottom: '2rem'}}>←  Go Back</h4>
                </Button>
                { location.state ? (<SingleBlog singleBlog={location.state.data} editMode={false}/>) : (<h1>No blog found</h1>) }
            </div>
        </>
    )
}