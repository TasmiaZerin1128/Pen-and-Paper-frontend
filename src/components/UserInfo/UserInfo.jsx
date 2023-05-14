import * as React from "react";
import { TextField, Button, Typography } from "@mui/material";
import "../../pages/profile/profile.css";
import { useState, useEffect } from "react";
import { ToastContainer , Zoom } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { getUserByUsername, updateUserByUsername } from "../../services/user";
import { showToast } from "../../services/toast";
import Loading from "../../components/Loading/Loading";

export default function UserInfo({cookieUsername, setUserId}) {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
  
    const [error, setError] = useState(null);
  
    const [disableSave, setDisableSave] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
  
    const navigate = useNavigate();
  
    const updatePassword = async () => {
      const updatedUser = {
        oldPassword: oldPassword,
        newPassword: password
      }
      if(password.length >= 6){
        let response = await updateUserByUsername(username, updatedUser);
        if(response.status === 200){
          console.log("successful");
          setPassword("");
          setOldPassword("");
          setError(null);
          showToast("Password updated successfully","passwordChanged" );
        } else {
          setError(response.data);
        }
      } else {
        setError("Password must be atleast of 6 characters");
      }
    }
  
    useEffect(() => {
      if(password.trim().length === 0){
        setDisableSave(true);
      } else {
        setDisableSave(false);
      }
    }, [password])
  
    useEffect(() => {
      async function getUserDetails() {
        let details = await getUserByUsername(cookieUsername);
        setUserId(details.data.id);
        setFullName(details.data.fullName);
        setUsername(details.data.username);
        setEmail(details.data.email);
  
        setIsLoading(false);
      }
      getUserDetails();
    }, [cookieUsername]);
  
    return (
      <>
      { isLoading ? (<Loading />) :
      (<div className="userInfoWrapper">
        <ToastContainer transition={Zoom} limit={1} toastStyle={{ backgroundColor: "#168030" }}/>
        <div className="profilePicWrap">
          <img
            src="\src\assets\images\profile-pic2.jpg"
            alt="profile"
            className="profilePic"
          />
        </div>
        <div className="info">
          <div className="infoForm">
            <form>
              <div className="individual">
                <h4 style={{marginRight: '2rem', fontWeight: '900'}}>Full Name</h4>
                <Typography
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: "70%" }}
                >{fullName}</Typography>
              </div>
              <div className="individual">
                <h4 style={{marginRight: '2rem', fontWeight: '900'}}>Username</h4>
                <Typography
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: "70%" }}
                >{username}</Typography>
              </div>
              <div className="individual">
                <h4 style={{marginRight: '2rem', fontWeight: '900'}}>Email</h4>
                <Typography
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "70%" }}
                >{email}</Typography>
              </div>
            </form>
          </div>
          <hr style={{border: '1px solid #e0d8c3'}} />
          <div className="infoForm" style={{padding: '1rem 4rem 1.5rem'}}>
            <div className="individual">
              { error ? (<h4 style={{ backgroundColor: '#d6817d', borderRadius: '5px', color: 'white', padding: '0.5rem 1rem'}}>{error}</h4>) : null }
            </div>
            <div className="individual">
              <h4 style={{marginRight: '2rem', fontWeight: '900'}}>Old Password</h4>
              <TextField
                  id="oldpassword"
                  size="small"
                  label={oldPassword === "" ? "Enter Old Password" : ""}
                  variant="outlined"
                  type="password"
                  InputLabelProps={{ shrink: false }}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  style={{ width: "70%"}}
                />
            </div>
            <div className="individual">
              <h4 style={{marginRight: '2rem', fontWeight: '900'}}>New Password</h4>
              <TextField
                  id="password"
                  size="small"
                  label={password === "" ? "Enter New Password" : ""}
                  variant="outlined"
                  type="password"
                  InputLabelProps={{ shrink: false }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "70%"}}
                />
            </div>
          </div>
        </div>
        <div className="profileButtons">
          <Button variant="outlined" className="goBack" onClick={(e) => navigate("/dashboard")}>
            Go Back
          </Button>
          <Button disabled={disableSave} variant="contained" className="save" onClick={(e) => updatePassword()}>
            Save Changes
          </Button>
        </div>
      </div>) }
      </>
    );
  }