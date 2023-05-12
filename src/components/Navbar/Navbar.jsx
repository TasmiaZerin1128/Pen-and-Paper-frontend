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
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { logout } from "../../services/auth";
import { showToast } from "../../services/toast";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import CreateBlog from "../CreateBlog/CreateBlog";
import "./Navbar.css";

function NavbarGeneral() {
  const navigate = useNavigate();

  return (
    <Toolbar>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          cursor: "pointer",
          flexGrow: 1,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <img
          src="\src\assets\images\logo-sm.svg"
          style={{ width: "4rem", marginTop: "0.5rem" }}
        />
      </Typography>
      <Box sx={{ flexGrow: 0 }}>
        <Button className="loginNav" onClick={() => navigate("/login")}>
          Sign In
        </Button>
        <Button className="registerNav" onClick={() => navigate("/register")}>
          Get Started
        </Button>
      </Box>
    </Toolbar>
  );
}

function NavbarLoggedIn({ handleBlogAdd }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { checkLoggedIn, loggedInUsername, setStatusSignedOut } =
    useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            cursor: "pointer",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <img
            src="\src\assets\images\logo-sm.svg"
            alt="logo"
            style={{ width: "4rem", marginTop: "0.5rem" }}
          />
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon style={{ color: "#863812" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuItem style={{ backgroundColor: "transparent" }}>
              <CreateBlog handleBlogAdd={handleBlogAdd} showToast={showToast} />
            </MenuItem>
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            cursor: "pointer",
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <img
            src="\src\assets\images\logo-sm.svg"
            alt="logo"
            style={{ width: "4rem", marginTop: "0.5rem" }}
          />
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <CreateBlog handleBlogAdd={handleBlogAdd} showToast={showToast} />
        </Box>

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
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  );
}

export default function Navbar({ handleBlogAdd }) {
  const { checkLoggedIn, loggedInUsername } = useContext(AuthContext);

  useEffect(() => {
    checkLoggedIn();
  }, []);

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
