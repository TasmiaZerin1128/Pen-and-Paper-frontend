import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { deleteUserByUsername } from '../../services/user';
import Cookies from 'js-cookie';
import './DeleteAccount.css';

export default function DeleteAccount({cookieUsername}) {
    const navigate = useNavigate();

    const deleteUserAccount = async () => {
        const response = await deleteUserByUsername(cookieUsername);
        console.log(response.data);
        if(response.status === 200) {
            Cookies.remove("jwt");
            navigate("/login");
        }
        
    }
  return (
    <>
    <div className="deleteSection">
        <h1 style={{margin: 0}}>Delete Your Account</h1>
        <p>Deleting you account will remove all of your information from our database. This cannot be undone.</p>
        <div className="buttons">
            <Button disableElevation variant='outlined' className="cancelButton" onClick={() => navigate("/dashboard")}>Cancel</Button>
            <Button disableElevation variant='contained' className="deleteButton" onClick={() => deleteUserAccount()}>Delete Account</Button>
        </div>
    </div>
    </>
  );
}