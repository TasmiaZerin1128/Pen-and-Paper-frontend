import { Button, Grid, ListItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import { useInView, InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "./home.css";

export default function Home() {
  
  const navigate = useNavigate();
  const { checkLoggedIn } = useContext(AuthContext);

  const [ refTitle, inViewTitle ] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [ refConnect, inViewConnect ] = useInView({
    triggerOnce: false,
  });

  const [ refCards, inViewCards ] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [ refCR, inViewCR ] = useInView({
    threshold: 0,
    triggerOnce: false,
  });


  return (
    <>
    <div style={{ position: 'sticky', top: 0, zIndex: 100}}>
      <Navbar/>
    </div>
      <div className="container">
        <h1 ref={refTitle} className={`title ${inViewTitle ? 'show' : 'hide'}`}>Your Ideas, Your Platform</h1>
        <p ref={refTitle} className={inViewTitle ? 'show' : 'hide'}>
        A Platform for Your Voice: Share Your Stories and Ideas on Our Blog
        </p>
        <span onClick={() => navigate("/dashboard")} ref={refTitle} className={`learnMore ${inViewTitle ? 'show' : 'hide'}`}>
          START BLOGGING
        </span>
      </div>

      <div className="blank-1">
        <div className="left-line">
          <h2 style={{ fontSize: '2.5rem', marginTop: '0rem' }} ref={refConnect} className={inViewConnect ? 'show' : 'hide'}>Connect, Create and Grow</h2>
          <p ref={refConnect} className={inViewConnect ? 'show' : 'hide'}>Create blogs, get idea and inspiration from other’s blogs</p>
          <span onClick={() => navigate("/users")} style={{ color: '#EBE4D2', cursor: 'pointer'}} ref={refConnect} className={inViewConnect ? 'show' : 'hide'}><b>View Enrolled Users →</b></span>
        </div>
        <div className="right-button">
          <Button ref={refConnect} className={`get-started ${inViewConnect ? 'show' : 'hide'}`} onClick={() => navigate("/login")}>Get Started</Button>
        </div>
      </div>

      <div className="container second">
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <ListItem></ListItem>
          </Grid>
          <Grid item xs={7}>
            <ListItem className="cardsList">
        <div ref={refCards} className={`item ${inViewCards ? 'showCards' : 'hideCards'}`}>
          <div className="card">
            <h3><b>Gain Knowledge</b></h3>
            <p>
            Gain in-depth information on various topics from the bloggers around the world.
            </p>
          </div>
        </div>
        <div ref={refCards} className={`item ${inViewCards ? 'showCards' : 'hideCards'}`}>
          <div className="card">
            <h3><b>Find Inspiration</b></h3>
            <p>
            Find inspirational stories, quotes, and tips that can motivate one to achieve the goals.
            </p>
          </div>
        </div>
        <div ref={refCards} className={`item ${inViewCards ? 'showCards' : 'hideCards'}`}>
          <div className="card">
            <h3><b>Connect with Others</b></h3>
            <p>
            Connect with other like-minded individuals. Engage in discussions, ask questions, and share your opinions with others.
            </p>
          </div>
        </div>
        </ListItem>
          </Grid>
        </Grid>
      </div>

      <div className="blank-2">
        <div className="footer">
        <p ref={refCR} className={`copyright ${inViewCR ? 'showCR' : 'hideCR'}`}>Copyrights reserved © 2023</p>
        </div>
      </div>
      </>
  );
}
