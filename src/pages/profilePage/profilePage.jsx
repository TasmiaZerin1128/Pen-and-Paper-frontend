import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/Contexts";
import { useParams } from "react-router-dom";
import OwnProfile from "../ownProfile/ownProfile";
import UsersProfile from "../usersProfile/usersProfile";
import { useState } from "react";
import { Loading } from "../../components/Loading/Loading";

export default function Profile() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { options } = useParams();
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const { checkLoggedIn, loggedInUsername } = useContext(AuthContext);

    useEffect(() => {
        if(AuthContext){
        checkLoggedIn();
        if(loggedInUsername){
            if(loggedInUsername !== username){
                setIsOwnProfile(false);
                if(options) navigate('*');
            } else {
                setIsOwnProfile(true);
            }
        } else {
            setIsOwnProfile(false);
            if(options) navigate('*');
        }
        }
        setIsLoading(false);
    });


    if(isLoading){
        return <Loading />
    }
    if(isOwnProfile){
        return <OwnProfile />
    }
    return <UsersProfile />
}