import { Button, Grid, ListItem } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import "./home.css";

export default function Home() {
  
  const navigate = useNavigate();
  const { checkLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if(checkLoggedIn()){
      navigate("/dashboard");
    }
  })

  return (
    <>
    <div style={{ position: 'sticky', top: 0, zIndex: 100}}>
      <Navbar/>
    </div>
      <div className="container">
        <h1 className="title">Your Ideas, Your Platform</h1>
        <p>
        A Platform for Your Voice: Share Your Stories and Ideas on Our Blog
        </p>
        <a href="./dashboard" className="learnMore">
          START BLOGGING
        </a>
      </div>

      <div className="blank-1">
        <div className="left-line">
          <h2 style={{ fontSize: '2.5rem', marginTop: '0rem' }}>Connect, Create and Grow</h2>
          <p>Create blogs, get idea and inspiration from other’s blogs</p>
          <a href="./enrolledusers" style={{ color: '#EBE4D2'}}><b>View Enrolled Users →</b></a>
        </div>
        <div className="right-button">
          <Button className="get-started" onClick={() => navigate("/login")}>Get Started</Button>
        </div>
      </div>

      <div className="container second">
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <ListItem></ListItem>
          </Grid>
          <Grid item xs={7}>
            <ListItem className="cardsList">
              <div className="item">
          <div className="card">
            <h3>Gain Knowledge</h3>
            <p>
            Gain in-depth information on various topics from the bloggers around the world.
            </p>
          </div>
        </div>
        <div className="item">
          <div className="card">
            <h3>Find Inspiration</h3>
            <p>
            Find inspirational stories, quotes, and tips that can motivate one to achieve the goals.
            </p>
          </div>
        </div>
        <div className="item">
          <div className="card">
            <h3>Connect with Others</h3>
            <p>
            Connect with other like-minded individuals. Engage in discussions, ask questions, and share your opinions with others.
            </p>
          </div>
        </div></ListItem>
          </Grid>
        </Grid>
      </div>

      <div className="blank-2">
        <div className="footer">
        <p className="copyright">Copyrights reserved © 2023</p>
        </div>
      </div>
      </>
  );
}
