import "./home.css";
import Navbar from "../navbar/navbar";
import { Button, Grid, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div class="container">
        <h1 className="title">Your Ideas, Your Platform</h1>
        <p>
        A Platform for Your Voice: Share Your Stories and Ideas on Our Blog
        </p>
        <a href="./login" className="learnMore">
          START BLOGGING
        </a>
      </div>

      <div class="blank-1">
        <div className="left-line">
          <h2 style={{ fontSize: '2.5rem' }}>Connect, Create and Grow</h2>
          <p>Create blogs, get idea and inspiration from other’s blogs</p>
        </div>
        <div className="right-button">
          <Button className="get-started" onClick={() => navigate("/login")}>Get Started</Button>
        </div>
      </div>

      <div class="container second">
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <ListItem></ListItem>
          </Grid>
          <Grid item xs={7}>
            <ListItem className="cardsList">
              <div class="item">
          <div class="card">
            <h3>Gain Knowledge</h3>
            <p>
            Gain in-depth information on various topics from the bloggers around the world.
            </p>
          </div>
        </div>
        <div class="item">
          <div class="card">
            <h3>Find Inspiration</h3>
            <p>
            Find inspirational stories, quotes, and tips that can motivate one to achieve the goals.
            </p>
          </div>
        </div>
        <div class="item">
          <div class="card">
            <h3>Connect with Others</h3>
            <p>
            Connect with other like-minded individuals. Engage in discussions, ask questions, and share your opinions with others.
            </p>
          </div>
        </div></ListItem>
          </Grid>
        </Grid>
      </div>

      <div class="blank-2">
        <div className="footer">
        <p className="copyright">Copyrights reserved © 2023</p>
        </div>
      </div>
      </>
  );
}
