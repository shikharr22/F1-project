import React from "react";
import "./App.css";

const NavigationRace = () => {
  const handlePrev = () => {
    document.getElementById("prevRace").style =
      "top:5%; right:50%; transform: translate(50%,5%) scale(1);opacity:1;z-index:2;";
    document.getElementById("currentRace").style =
      "top:8%; right:25%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;";
    document.getElementById("upcomingRace").style =
      "top:8%; right:75%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;";
  };

  const handleCurr = () => {
    document.getElementById("currentRace").style =
      "top:5%; right:50%; transform: translate(50%,5%) scale(1);opacity:1;z-index:2;";
    document.getElementById("upcomingRace").style =
      "top:8%; right:25%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;";
    document.getElementById("prevRace").style =
      "top:8%; right:75%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;";
  };

  const handleUpcoming = () => {
    document.getElementById("upcomingRace").style =
      "top:5%; right:50%; transform: translate(50%,5%) scale(1);opacity:1;z-index:2;";
    document.getElementById("prevRace").style =
      "top:8%; right:25%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;";
    document.getElementById("currentRace").style =
      "top:8%; right:75%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;";
  };
  return (
    <>
      <div id="navigation">
        <a href="#" className="navigationItem" onClick={handlePrev}>
          <img
            src={require("./Assets/left-arrow.png")}
            style={{ width: "150px", height: "60px" }}
          />
        </a>
        <a
          href="#"
          className="navigationItem"
          style={{ backgroundColor: "transparent" }}
          onClick={handleCurr}
        >
          <img
            src={require("./Assets/current.png")}
            style={{ width: "150px", height: "60px" }}
          />
        </a>
        <a href="#" className="navigationItem" onClick={handleUpcoming}>
          <img
            src={require("./Assets/right-arrow.png")}
            style={{ width: "150px", height: "60px" }}
          />
        </a>
      </div>
    </>
  );
};

export default NavigationRace;
