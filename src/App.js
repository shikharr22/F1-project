import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import "./App.css";
import axios from "axios";

const App = () => {

  const [data,setData]=useState([])
  const handlePrev = () => {
    document.getElementById("prevRace").style =
      "top:5%; right:50%; transform: translate(50%,5%) scale(1);opacity:1;z-index:2;";
    document.getElementById("currentRace").style =
      "top:8%; right:25%; transform: translate(50%,5%) scale(0.8);opacity:0.4;z-index:1;";
    document.getElementById("upcomingRace").style =
      "top:8%; right:75%; transform: translate(50%,5%) scale(0.8);opacity:0.4;z-index:1;";
  };

  const handleCurr = () => {
    document.getElementById("currentRace").style =
      "top:5%; right:50%; transform: translate(50%,5%) scale(1);opacity:1;z-index:2;";
    document.getElementById("upcomingRace").style =
      "top:8%; right:25%; transform: translate(50%,5%) scale(0.8);opacity:0.4;z-index:1;";
    document.getElementById("prevRace").style =
      "top:8%; right:75%; transform: translate(50%,5%) scale(0.8);opacity:0.4;z-index:1;";
  };

  const handleUpcoming = () => {
    document.getElementById("upcomingRace").style =
      "top:5%; right:50%; transform: translate(50%,5%) scale(1);opacity:1;z-index:2;";
    document.getElementById("prevRace").style =
      "top:8%; right:25%; transform: translate(50%,5%) scale(0.8);opacity:0.4;z-index:1;";
    document.getElementById("currentRace").style =
      "top:8%; right:75%; transform: translate(50%,5%) scale(0.8);opacity:0.4;z-index:1;";
  };

  const getData = async () => {
    const response=await axios("http://ergast.com/api/f1/2021/5/driverStandings.json")
    setData(response.data);

    if(data!=undefined)
    {
      console.log(data.MRData.StandingsTable);
    }

    
  };

  useEffect(() => {
    getData();
  },[]);

  
  return (
    <>
      <div id="container">
        <div id="section1">
          <div id="prevRace"></div>
          <div id="currentRace"></div>
          <div id="upcomingRace"></div>
        </div>
        <div id="navigation">
          <a href="#" className="navigationItem" onClick={handlePrev}>
            <img
              src={require("./left-arrow.png")}
              style={{ width: "150px", height: "60px" }}
            />
          </a>
          <a href="#" className="navigationItem" onClick={handleCurr}>
            <img
              src={require("./current.png")}
              style={{ width: "150px", height: "60px" }}
            />
          </a>
          <a href="#" className="navigationItem" onClick={handleUpcoming}>
            <img
              src={require("./right-arrow.png")}
              style={{ width: "150px", height: "60px" }}
            />
          </a>
        </div>
        <div id="section2">
          <div className="tabs">
            <a href="#standings">
              <img
                style={{ width: "90%", height: "100%" }}
                src={require("./drivers.jpg")}
              />
            </a>
          </div>
          <div className="tabs">
            <a href="#standings">
              <img
                style={{ top: "0%", width: "90%", height: "100%" }}
                src={require("./constructors.jpg")}
              />
            </a>
          </div>
          <div className="tabs">
            <a href="#news">
              <img
                style={{ top: "0%", width: "90%", height: "100%" }}
                src={require("./news.jpg")}
              />
            </a>
          </div>
          <div className="tabs">
            <img
              style={{ top: "0%", width: "90%", height: "100%" }}
              src={require("./trackLocator.jpg")}
            />
          </div>
        </div>
        <div id="standings">
          <div id="driversStandings"></div>
          <div id="constructorsStandings"></div>
        </div>
        <div id="news"></div>
      </div>
    </>
  );
};

export default App;
