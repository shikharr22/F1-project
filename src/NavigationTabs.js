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
    <>
      <Grid container direction="row" spacing={3}>
        <Grid container xs={3} direction="row">
          <Stack direction="row">
            <div style={{ width: "100vw", height: "50vh" ,marginTop:"2rem",marginLeft:"2rem"}}>
              <div
                style={{ width: "15rem", height: "20rem", overflowY: "hidden" }}
              >
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
            </div>
            <div style={{ width: "100vw", height: "50vh",marginTop:"2rem",marginLeft:"2rem"}}>
            <div
                style={{ width: "15rem", height: "20rem", overflowY: "hidden" }}
              >
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
            </div>
          </Stack>
          <Stack direction="row">
            <div
              style={{ width: "100vw", height: "50vh" ,marginLeft:"2rem"}}
            >
               <div
                style={{ width: "15rem", height: "20rem", overflowY: "hidden" }}
              >
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
            </div>
            <div
              style={{
                width: "100vw",
                height: "50vh",
                marginLeft:"2rem"
              }}
            >
              <div
                style={{ width: "15rem", height: "20rem", overflowY: "hidden" }}
              >
                <Card sx={{ backgroundColor: "transparent" }}>
                  <CardContent>
                    <a
                      id="GridTab"
                      href=""
                      onMouseOver={handleGridMouseOver}
                      onMouseOut={handleGridMouseOut}
                      target="_blank"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <CardMedia
                        component="img"
                        height="1"
                        src={require("./Assets/grid2022.png")}
                        alt="Grid 2022"
                      />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Stack>
        </Grid>
        <Grid container xs={8} direction="row">
            <Grid item xs={12}>
              <div id="ds">
                <DriverStandings />
              </div>
              <div id="cs">
                <ConstructorsStandings />
              </div>
            </Grid> 
        </Grid>
      </Grid>
    </>
  );
};

export default NavigationTabs;
