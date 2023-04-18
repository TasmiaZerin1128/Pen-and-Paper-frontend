import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import NavbarDashboard from "../navbar-dashboard/navbar-dashboard";
import BlogList from "../blogs/blogs";

import { getAllBlogs } from "../../services/blog";

import "./dashboard.css";

function UserBlogNavbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#EBE4D2",
        margin: "2rem 0",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl" style={{ paddingLeft: "0" }}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Blogs</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Users</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              className="userOption"
              sx={{
                my: 2,
                borderRadius: "0",
                borderBottom: "1px solid #5B3203",
                color: "#5B3203",
                display: "block",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1.2rem",
                fontFamily: "Poppins",
                marginRight: "5rem",
              }}
            >
              Blogs
            </Button>
            <Button
              className="blogOption"
              sx={{
                my: 2,
                borderRadius: "0",
                borderBottom: "1px solid #5B3203",
                color: "#5B3203",
                display: "block",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1.2rem",
                fontFamily: "Poppins",
                marginRight: "5rem",
              }}
            >
              Users
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default function Dashboard() {
  return (
    <>
      <NavbarDashboard />
      <div className="dashboard">
        <UserBlogNavbar />
        <BlogList />
      </div>
    </>
  );
}
