import React, { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { Grid, Stack } from "@mui/material";
import DriverStandings from "./DriverStandings";
import ConstructorsStandings from "./ConstructorsStandings";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";

const NavigationTabs = () => {
  const handleDriverMouseOver = () => {
    document.getElementById("driverStandingsTab").style.opacity = 1;
    document.getElementById("constStandingsTab").style.opacity = 0.2;
    document.getElementById("tracksTab").style.opacity = 0.2;
    document.getElementById("GridTab").style.opacity = 0.2;
  };

  const handleDriverMouseOut = () => {
    document.getElementById("driverStandingsTab").style.opacity = 1;
    document.getElementById("constStandingsTab").style.opacity = 1;
    document.getElementById("tracksTab").style.opacity = 1;
    document.getElementById("GridTab").style.opacity = 1;
  };

  const handleConstMouseOver = () => {
    document.getElementById("driverStandingsTab").style.opacity = 0.2;
    document.getElementById("constStandingsTab").style.opacity = 1;
    document.getElementById("tracksTab").style.opacity = 0.2;
    document.getElementById("GridTab").style.opacity = 0.2;
  };

  const handleConstMouseOut = () => {
    document.getElementById("driverStandingsTab").style.opacity = 1;
    document.getElementById("constStandingsTab").style.opacity = 1;
    document.getElementById("tracksTab").style.opacity = 1;
    document.getElementById("GridTab").style.opacity = 1;
  };

  const handleTrackMouseOver = () => {
    document.getElementById("driverStandingsTab").style.opacity = 0.2;
    document.getElementById("constStandingsTab").style.opacity = 0.2;
    document.getElementById("tracksTab").style.opacity = 1;
    document.getElementById("GridTab").style.opacity = 0.2;
  };

  const handleTrackMouseOut = () => {
    document.getElementById("driverStandingsTab").style.opacity = 1;
    document.getElementById("constStandingsTab").style.opacity = 1;
    document.getElementById("tracksTab").style.opacity = 1;
    document.getElementById("GridTab").style.opacity = 1;
  };

  const handleGridMouseOver = () => {
    document.getElementById("driverStandingsTab").style.opacity = 0.2;
    document.getElementById("constStandingsTab").style.opacity = 0.2;
    document.getElementById("tracksTab").style.opacity = 0.2;
    document.getElementById("GridTab").style.opacity = 1;
  };

  const handleGridMouseOut = () => {
    document.getElementById("driverStandingsTab").style.opacity = 1;
    document.getElementById("constStandingsTab").style.opacity = 1;
    document.getElementById("tracksTab").style.opacity = 1;
    document.getElementById("GridTab").style.opacity = 1;
  };

  const handleDriverMouseClick = () => {
    document.getElementById("ds").style.display = "block";
    document.getElementById("cs").style.display = "none";
    console.log("driver click");
  };

  const handleConstMouseClick = () => {
    document.getElementById("cs").style.display = "block";
    document.getElementById("ds").style.display = "none";
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center"}}
    >
      <Grid container direction="row" spacing={2}>
     
        <Grid item direction="row" xs={4}>
        <div style={{paddingTop:"2rem",height:"100vh",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <Grid item xs={6}>
            <a
              id="driverStandingsTab"
              onMouseOver={handleDriverMouseOver}
              onMouseOut={handleDriverMouseOut}
              onClick={handleDriverMouseClick}
              href="#standings"
            >
              <p
                style={{
                 
                  textAlign: "center",
                  fontFamily: "Russo One",
                  fontSize: "2rem",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                Drivers Standings
              </p>
            </a>
          </Grid>
          <Grid item xs={6}>
            <a
              id="constStandingsTab"
              onMouseOver={handleConstMouseOver}
              onMouseOut={handleConstMouseOut}
              onClick={handleConstMouseClick}
              href="#standings"
            >
              <p
                style={{
                  
                  textAlign: "center",
                  fontFamily: "Russo One",
                  fontSize: "2rem",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                Constructors Standings
              </p>
            </a>
          </Grid>
          <Grid item xs={6}>
            <a
              id="tracksTab"
              href="/TrackLocator"
              onMouseOver={handleTrackMouseOver}
              onMouseOut={handleTrackMouseOut}
              target="_blank"
            >
              <p
                style={{
                  
                  textAlign: "center",
                  fontFamily: "Russo One",
                  fontSize: "2rem",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                Track Locator
              </p>
            </a>
          </Grid>
          <Grid item xs={6}>
            <a
              id="GridTab"
              href="#F1grid"
              onMouseOver={handleGridMouseOver}
              onMouseOut={handleGridMouseOut}
            >
              <p
                style={{
                 
                  textAlign: "center",
                  fontFamily: "Russo One",
                  fontSize: "2rem",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                F1 Grid
              </p>
            </a>
           
          </Grid>
          </div>
        </Grid>
        
        <Grid item xs={8} direction="row">
          <div style={{width:"100vw",height:"100vh"}}>
          <Grid item xs={8}>
            <div id="ds">
              <DriverStandings />
            </div>
            <div id="cs">
              <ConstructorsStandings />
            </div>
          </Grid>
          </div>
        </Grid>
      </Grid>
      <a href="#">
        <p
          style={{
            width: "2rem",
            height: "2rem",
            color: "#ffd700",
            fontWeight: "bold",
            marginBottom: "2rem",
          }}
        >
          <ExpandMoreSharpIcon />
        </p>
      </a>
    </div>
  );
};

export default NavigationTabs;
