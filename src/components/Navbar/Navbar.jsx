import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { showToast } from "../../services/toast";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import LeftSide from "./NavbarLeftSide";
import ProfileMenu from "./NavbarProfileMenu";
import NavbarGeneral from "./NavbarGeneral";
import "./Navbar.css";

function NavbarLoggedIn({ handleBlogAdd }) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { checkLoggedIn, loggedInUsername } = useContext(AuthContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <LeftSide handleBlogAdd={handleBlogAdd} showToast={showToast} />

        <Box sx={{ flexGrow: 0 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {checkLoggedIn ? (
              <Typography
                textAlign="left"
                variant="body1"
                sx={{
                  padding: "0.5rem",
                  fontSize: "15px",
                  color: "#863812",
                  fontFamily: "Poppins",
                }}
              >
                Welcome <br />
                <b>{loggedInUsername}</b>!
              </Typography>
            ) : (
              <></>
            )}
            <Tooltip title="Open Profile">
              <IconButton
                style={{
                  width: "10%",
                  height: "10%",
                  margin: "0.6rem 0 0 1rem",
                }}
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt="profile icon"
                  src="\src\assets\images\profile-pic2.jpg"
                />
              </IconButton>
            </Tooltip>
          </div>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem disabled>
              <Typography
                textAlign="left"
                variant="body1"
                sx={{ padding: 0, fontSize: "14px" }}
              >
                Signed in as <br />
                <b>{loggedInUsername}</b>
              </Typography>
            </MenuItem>
            <Divider />
            <ProfileMenu />
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  );
}

export default function Navbar({ handleBlogAdd }) {
  const { loggedInUsername } = useContext(AuthContext);

  return (
    <>
      <ToastContainer
        transition={Zoom}
        limit={1}
        toastStyle={{ backgroundColor: "#168030" }}
      />
      <AppBar
        position="sticky"
        style={{
          backgroundColor: "#EBE4D2",
          borderBottom: "#5B3203 1px solid",
          boxShadow: "none",
        }}
      >
        {loggedInUsername ? ( <NavbarLoggedIn handleBlogAdd={handleBlogAdd} /> ) : ( <NavbarGeneral /> )}
      </AppBar>
    </>
  );
}
