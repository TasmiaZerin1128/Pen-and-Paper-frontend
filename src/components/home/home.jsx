import "./home.css";
import Navbar from "../navbar/navbar";
import { Button } from "@mui/material";
export default function Home() {
  return (
    <>
      <Navbar />
      <div class="container">
        <h1 className="title">Your Ideas, Your Platform</h1>
        <p>
        A Platform for Your Voice: Share Your Stories and Ideas on Our Blog
        </p>
        <a href="./login" className="learnMore">
          Start Blogging
        </a>
      </div>

      <div class="blank-1">
        <div className="left-line">
          <h2 style={{ fontSize: '2.5rem' }}>Connect, Create and Grow</h2>
          <p>Create blogs, get idea and inspiration from other’s blogs</p>
        </div>
        <div className="right-button">
          <Button className="get-started">Get Started</Button>
        </div>
      </div>

      <div class="container second">
        <div class="item">
          <div class="img img-first"></div>
          <div class="card">
            <h3>Rock climbing</h3>
            <p>
              The goal is to reach the summit of a formation or the endpoint of
              a usually pre-defined route without falling
            </p>
            <a href="#" className="learnMore">
              Learn more
            </a>
          </div>
        </div>
        <div class="item">
          <div class="img img-second"></div>
          <div class="card">
            <h3>Caving</h3>
            <p>
              Exploring underground through networks of tunnels and passageways,
              which can be natural or artificial.
            </p>
            <a href="#" className="learnMore">
              Learn more
            </a>
          </div>
        </div>
        <div class="item">
          <div class="img img-third"></div>
          <div class="card">
            <h3>Parachuting</h3>
            <p>
              Jumping from an aeroplane and falling through the air before
              opening your parachute.
            </p>
            <a href="#" className="learnMore">
              Learn more
            </a>
          </div>
        </div>
      </div>

      <div class="blank-2">
        <div className="footer">
        <p className="copyright">Copyrights reserved © 2023</p>
        </div>
      </div>
      </>
  );
}
