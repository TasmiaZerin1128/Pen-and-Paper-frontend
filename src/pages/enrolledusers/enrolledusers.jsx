import UsersList from "../../components/Users/Users";
import NavbarUsers from "../../components/NavbarUsers/NavbarUsers";
import { useState, useRef, useEffect } from "react";
import SearchedUser from "../../components/SearchedUser/SearchedUser";

export default function Users () {
    const [searchedUser, setSearchedUser] = useState('');

    const handleSearch = (searchText) => {
      setSearchedUser(searchText);
    };

    useEffect(() => {
        handleSearch();
    }, [searchedUser]);
    
    return (
        <>
        <NavbarUsers onSearch={handleSearch} />
        <div style={{ padding: '6rem' }}>
            {searchedUser ? (<SearchedUser searchedUser={searchedUser} />) : (<UsersList />) }
        </div>
        </>
    )
}