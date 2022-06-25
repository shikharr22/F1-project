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
  const [driverTab, setDriverTab] = useState("driversStandings2.png");
  const [constTab, setConstTab] = useState("ConstructorsStandings2.png");
  const [trackTab, setTrackTab] = useState("trackLocator2.png");

  const handleDriverMouseOver = () => {
    setDriverTab("driversStandings1.png");
    document.getElementById("tabs").classList.add("bgImageDriver");
  };

  const handleDriverMouseOut = () => {
    setDriverTab("driversStandings2.png");
    document.getElementById("tabs").classList.remove("bgImageDriver");
  };

  const handleConstMouseOver = () => {
    setConstTab("ConstructorsStandings1.png");
    document.getElementById("tabs").classList.add("bgImageConst");
    
  };

  const handleConstMouseOut = () => {
    setConstTab("ConstructorsStandings2.png");
    document.getElementById("tabs").classList.remove("bgImageConst");
  };

  const handleTrackMouseOver = () => {
    setTrackTab("trackLocator1.png");
    document.getElementById("tabs").classList.add("bgImageTrack");
  };

  const handleTrackMouseOut = () => {
    setTrackTab("trackLocator2.png");
    document.getElementById("tabs").classList.remove("bgImageTrack");
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
                onMouseOver={handleDriverMouseOver}
                onMouseOut={handleDriverMouseOut}
                href="#standings"
                style={{ backgroundColor: "transparent" }}
              >
                <CardMedia
                  component="img"
                  height="1"
                  src={require(`./Assets/${driverTab}`)}
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
                href="#standings"
                onMouseOver={handleConstMouseOver}
                onMouseOut={handleConstMouseOut}
                style={{ backgroundColor: "transparent" }}
              >
                <CardMedia
                  component="img"
                  height="1"
                  src={require(`./Assets/${constTab}`)}
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
                href="/TrackLocator"
                onMouseOver={handleTrackMouseOver}
                onMouseOut={handleTrackMouseOut}
                target="_blank"
                style={{ backgroundColor: "transparent" }}
              >
                <CardMedia
                  component="img"
                  height="1"
                  src={require(`./Assets/${trackTab}`)}
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
