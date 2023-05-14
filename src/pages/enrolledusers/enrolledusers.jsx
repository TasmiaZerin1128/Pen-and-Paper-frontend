import UsersList from "../../components/Users/Users";
import Navbar from "../../components/Navbar/Navbar";
import { useState, useRef, useEffect } from "react";
import PaginationBar from "../../components/Pagination/Pagination";

export default function Users () {
    const [pageNumber, setPageNumber] = useState(1);

    const changePageNumber = (page) => {
        setPageNumber(page);
      }
    
    return (
        <>
        <Navbar/>
        <div style={{ padding: '1rem 6rem 2rem' }}>
            <h1 style={{fontSize:'1.5rem', marginBottom: '2rem'}}><u>Enrolled Users</u></h1>
            <UsersList pageNumber={pageNumber}/>
            <PaginationBar changePageNumber={changePageNumber} navigationPage={'users'}/>
        </div>
        </>
    )
}