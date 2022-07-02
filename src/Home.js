import React, { useState } from "react";
import "./App.css";
import CurrRace from "./CurrRace.js";
import PrevRace from "./PrevRace.js";
import UpcomingRace from "./UpcomingRace.js";
import NavigationRace from "./NavigationRace.js";
import NavigationTabs from "./NavigationTabs";

import { Grid, Button } from "@mui/material";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import F1grid from "./F1grid";

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
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Russo One",
                  color: "white",
                  fontSize: "1.2rem",
                }}
                color="secondary"
              >
                Explore More
              </Button>
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
              paddingTop:"rem",
              backgroundImage:
                "linear-gradient(to right,#000000,#2b0c13,#4f0a18,#720115,#940007)",
              overflowY: "hidden",
            }}
          >
            <NavigationTabs />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            id="F1grid"
            style={{
              display: "flex",
              height: "100vh",
              width: "100vw",
              direction: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              backgroundColor: "black",
              overflowY: "hidden",
            }}
          >
            <F1grid />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
