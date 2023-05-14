import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";

export default function ProfileMenu(){
        const navigate = useNavigate();
      
        const { loggedInUsername, setStatusSignedOut } = useContext(AuthContext);
      
        const logoutUser = async () => {
          try {
            const response = await logout();
            setStatusSignedOut();
            console.log(response);
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        };
        
        return (
            <>
            <MenuItem onClick={(e) => navigate(`/profile/${loggedInUsername}`)}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center" sx={{ padding: 0 }}>
                Profile
              </Typography>
            </MenuItem>
            <MenuItem onClick={(e) => logoutUser()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center" sx={{ padding: 0 }}>
                Logout
              </Typography>
            </MenuItem>
            </>
        )
}