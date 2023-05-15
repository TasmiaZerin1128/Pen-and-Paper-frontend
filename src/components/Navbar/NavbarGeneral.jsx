import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function NavbarGeneral() {
    const navigate = useNavigate();
  
    return (
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="a"
          onClick={() => navigate('/')}
          sx={{
            mr: 2,
            cursor: "pointer",
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <img
            src="images/logo-sm.svg"
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