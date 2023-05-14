import CreateBlog from "../CreateBlog/CreateBlog";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LeftSide({handleBlogAdd, showToast}) {
  const navigate = useNavigate();
  
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };

    return (
        <>
        <Typography
          variant="h6"
          noWrap
          component="a"
          onClick={() => navigate("/dashboard")}
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
          onClick={() => navigate("/dashboard")}
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
        </>
    );
}
