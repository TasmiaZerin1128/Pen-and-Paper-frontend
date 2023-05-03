import { useEffect, useState } from "react";
import SingleBlog from "../../components/SingleBlogCard/SingleBlogCard";
import { useLocation, useNavigate } from "react-router-dom";

export default function ShowSingleBlog() {
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Whyy?");
        if (!location.state) {
          navigate("*");
        }
    }, [location]);

    return (
        <>
            <div style={{ padding: '3rem' }}>
                <h4><a href="/dashboard" style={{ fontSize: '16px', color: '#863812', textDecoration: 'none', marginBottom: '2rem'}}>←  Go back to Dashboard</a></h4>
                { location.state ? (<SingleBlog singleBlog={location.state.data} />) : (<h1>No blog found</h1>) }
            </div>
        </>
    )
}