import React, { useState } from "react";
import "./App.css";
import CurrRace from "./CurrRace.js";
import PrevRace from "./PrevRace.js";
import UpcomingRace from "./UpcomingRace.js";
import NavigationRace from "./NavigationRace.js";
import NavigationTabs from "./NavigationTabs";
import DriverStandings from "./DriverStandings";
import ConstructorsStandings from "./ConstructorsStandings";
import News from "./News";
import { Grid, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const App = () => {
  console.log("App Render");

  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12}>
          <div
            style={{
              height: "65vh",
              width: "100vw",
              backgroundColor: "black",
              color: "white",
              overflowX: "hidden",
              padding: 0,
            }}
          >
            <Grid container direction="row" RowSpacing={3}>
              <Grid item xs={3}>
                <PrevRace />
              </Grid>
              <Grid item xs={3}>
                {" "}
                <CurrRace />
              </Grid>
              <Grid item xs={3}>
                {" "}
                <UpcomingRace />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "35vh",
              width: "100vw",
              gap: 10,
              backgroundColor: "black",
            }}
          >
            <NavigationRace />

            <a href="#tabs">
              <p
                style={{
                  fontSize: "2vh",
                  color: "#ffd700",
                  fontWeight: "bold",
                }}
              >
                EXPLORE MORE
              </p>
            </a>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            id="tabs"
            style={{
              display: "flex",
              direction: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              backgroundColor:"#ffd700",
            }}
          >
            <NavigationTabs />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              height: "auto",
              width: "100vw",
              backgroundColor:"white",
              color: "white",
              overflow:"auto",
            }}
          >
            <Grid container direction="row">
              <Grid item xs={6}>
                <div style={{marginTop:"2rem",overflow:"hidden",}} class="scroll" id="driverStandings">
                <DriverStandings />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div id="constStandings">
                {/* <ConstructorsStandings /> */}
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
