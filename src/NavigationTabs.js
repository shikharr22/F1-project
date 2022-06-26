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
import { Grid } from "@mui/material";
import DriverStandings from "./DriverStandings";
import ConstructorsStandings from "./ConstructorsStandings";


const NavigationTabs = () => {
  
  const handleDriverMouseOver = () => {
    
    document.getElementById("driverStandingsTab").style.opacity = 1;
    document.getElementById("constStandingsTab").style.opacity = 0.2;
    document.getElementById("tracksTab").style.opacity = 0.2;
  };

  const handleDriverMouseOut = () => {
   
    document.getElementById("driverStandingsTab").style.opacity = 1;
    document.getElementById("constStandingsTab").style.opacity = 1;
    document.getElementById("tracksTab").style.opacity = 1;
  };

  const handleConstMouseOver = () => {
   
    document.getElementById("driverStandingsTab").style.opacity = 0.2;
    document.getElementById("constStandingsTab").style.opacity = 1;
    document.getElementById("tracksTab").style.opacity = 0.2;
  };

  const handleConstMouseOut = () => {
    
    document.getElementById("driverStandingsTab").style.opacity = 1;
    document.getElementById("constStandingsTab").style.opacity = 1;
    document.getElementById("tracksTab").style.opacity = 1;
  };

  const handleTrackMouseOver = () => {
      document.getElementById("driverStandingsTab").style.opacity = 0.2;
    document.getElementById("constStandingsTab").style.opacity = 0.2;
    document.getElementById("tracksTab").style.opacity = 1;
  };

  const handleTrackMouseOut = () => {
    
    document.getElementById("driverStandingsTab").style.opacity = 1;
    document.getElementById("constStandingsTab").style.opacity = 1;
    document.getElementById("tracksTab").style.opacity = 1;
  };

  const handleDriverMouseClick=()=>{
    document.getElementById("ds").style.display="block";
    document.getElementById("cs").style.display="none";
    console.log("driver click");
  }

  const handleConstMouseClick=()=>{
    document.getElementById("cs").style.display="block";
    document.getElementById("ds").style.display="none";
  }

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={4}>
          <div
            style={{
              backgroundColor: "black",
              height: "100vh",
              width: "100vw",
              
            }}
            alignItems="center"
          >
            <Grid container xs={4} direction="column" spacing={2}>
              <Grid item xs={6}>
                <div style={{width:"20rem",height:"30rem",overflowY:"hidden"}}>
                <Card sx={{ backgroundColor: "transparent" }}>
                  <CardContent>
                    <a
                      id="driverStandingsTab"
                      onMouseOver={handleDriverMouseOver}
                      onMouseOut={handleDriverMouseOut}
                      onClick={handleDriverMouseClick}
                      href="#standings"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <CardMedia
                        component="img"
                        height="1"
                        src={require("./Assets/driversStandings2.png")}
                        alt="Drivers standings"
                      />
                    </a>
                  </CardContent>
                </Card>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={6}>
            <div style={{width:"20rem",height:"30rem",overflowY:"hidden"}}>
              <Card sx={{ backgroundColor: "transparent" }}>
                <CardContent>
                  <a
                    id="constStandingsTab"
                    href="#standings"
                    onMouseOver={handleConstMouseOver}
                    onMouseOut={handleConstMouseOut}
                    onClick={handleConstMouseClick}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <CardMedia
                      component="img"
                      height="1"
                      src={require("./Assets/ConstructorsStandings2.png")}
                      alt="Constructors standings"
                    />
                  </a>
                </CardContent>
              </Card>
              </div>
            </Grid>
            <Grid item xs={2} >
            <div style={{width:"20rem",height:"30rem",overflowY:"hidden"}}>
              <Card sx={{ backgroundColor: "transparent" }}>
                <CardContent>
                  <a
                    id="tracksTab"
                    href="/TrackLocator"
                    onMouseOver={handleTrackMouseOver}
                    onMouseOut={handleTrackMouseOut}
                    target="_blank"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <CardMedia
                      component="img"
                      height="1"
                      src={require("./Assets/trackLocator2.png")}
                      alt="Track Locator"
                    />
                  </a>
                </CardContent>
              </Card>
              </div>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={8}>
            <Grid container xs={8} direction="row" justifyContent="stretch">
                <Grid item xs={8}>
                <div  id="ds" >
                <DriverStandings/>
                </div>
                <div id="cs" >
                <ConstructorsStandings/>
                </div>
                </Grid>
            </Grid>
            
          
        </Grid>
      </Grid>
    </>
  );
};

export default NavigationTabs;

