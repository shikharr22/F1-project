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

const NavigationTabs = () => {
  

  const handleDriverMouseOver = () => {
  
    document.getElementById("tabs").classList.add("bgImageDriver");
    document.getElementById("driverStandingsTab").style.opacity=1;
    document.getElementById("constStandingsTab").style.opacity=0.2;
    document.getElementById("tracksTab").style.opacity=0.2;
    document.getElementById("")
  };

  const handleDriverMouseOut = () => {
   
    document.getElementById("tabs").classList.remove("bgImageDriver");
    document.getElementById("driverStandingsTab").style.opacity=1;
    document.getElementById("constStandingsTab").style.opacity=1;
    document.getElementById("tracksTab").style.opacity=1;
  };

  const handleConstMouseOver = () => {
    
    document.getElementById("tabs").classList.add("bgImageConst");
    document.getElementById("driverStandingsTab").style.opacity=0.2;
    document.getElementById("constStandingsTab").style.opacity=1;
    document.getElementById("tracksTab").style.opacity=0.2;
    
  };

  const handleConstMouseOut = () => {
   
    document.getElementById("tabs").classList.remove("bgImageConst");
    document.getElementById("driverStandingsTab").style.opacity=1;
    document.getElementById("constStandingsTab").style.opacity=1;
    document.getElementById("tracksTab").style.opacity=1;
  };

  const handleTrackMouseOver = () => {
    
    document.getElementById("tabs").classList.add("bgImageTrack");
    document.getElementById("driverStandingsTab").style.opacity=0.2;
    document.getElementById("constStandingsTab").style.opacity=0.2;
    document.getElementById("tracksTab").style.opacity=1;
  };

  const handleTrackMouseOut = () => {
    
    document.getElementById("tabs").classList.remove("bgImageTrack");
    document.getElementById("driverStandingsTab").style.opacity=1;
    document.getElementById("constStandingsTab").style.opacity=1;
    document.getElementById("tracksTab").style.opacity=1;
  };
  

  return (
    <>
      <Grid
        container
        spacing={8}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2} zeroMinWidth>
          <Card sx={{ backgroundColor: "transparent" }}>
            <CardContent>
              <a
                id="driverStandingsTab"
                onMouseOver={handleDriverMouseOver}
                onMouseOut={handleDriverMouseOut}
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
        </Grid>
        <Grid item xs={2} zeroMinWidth>
          <Card sx={{ backgroundColor: "transparent" }}>
            <CardContent>
              <a
               id="constStandingsTab"
                href="#standings"
                onMouseOver={handleConstMouseOver}
                onMouseOut={handleConstMouseOut}
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
        </Grid>
        <Grid item xs={2} zeroMinWidth>
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
        </Grid>
      </Grid>
    </>
  );
};

export default NavigationTabs;
