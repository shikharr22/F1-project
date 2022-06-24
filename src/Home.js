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

const App = () => {
  console.log("App Render");

  return (
    <>
      <div id="container">
        <div id="homeScreenSection">
          <div id='raceStats'>
            <PrevRace />
            <CurrRace />
            <UpcomingRace />
          </div>
          <NavigationRace />
        </div>
        <div id="tabs">
           <NavigationTabs />
        </div>
        <div id="standings">
          <div id="driversStandings">
            <DriverStandings />
          </div>
          <div id="constructorsStandings">
            <ConstructorsStandings />
          </div>
        </div>
        {/* <div id="news"><News/></div> */}
      </div>
    </>
  );
};

export default App;
