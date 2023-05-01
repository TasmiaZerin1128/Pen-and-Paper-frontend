import UsersList from "../../components/users/users";
import NavbarUsers from "../../components/NavbarUsers/NavbarUsers";
import { useState, useRef, useEffect } from "react";
import SearchedUser from "../../components/SearchedUser/SearchedUser";
import PaginationBar from "../../components/Pagination/Pagination";

export default function Users () {
    const [searchedUser, setSearchedUser] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const handleSearch = (searchText) => {
      setSearchedUser(searchText);
    };

    const changePageNumber = (page) => {
        setPageNumber(page);
      }

    useEffect(() => {
        handleSearch();
    }, [searchedUser]);
    
    return (
        <>
        <NavbarUsers onSearch={handleSearch} />
        <div style={{ padding: '1rem 6rem 2rem' }}>
            <h1 style={{fontSize:'1.5rem', marginBottom: '2rem'}}><u>Enrolled Users</u></h1>
            {searchedUser ? (<SearchedUser searchedUser={searchedUser} />) : (<UsersList pageNumber={pageNumber}/>) }
            <PaginationBar changePageNumber={changePageNumber} navigationPage={'enrolledusers'}/>
        </div>
        </>
    )
}