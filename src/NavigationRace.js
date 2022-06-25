import React from "react";
import "./App.css";
import { ButtonGroup, Button } from "@mui/material";

const NavigationRace = () => {
  const handlePrev = () => {
    document.getElementById("prevRace").style =
      "top:5%; right:50%; transform: translate(50%,5%) scale(1);opacity:1;z-index:2;opacity:1;";
    document.getElementById("currentRace").style =
      "top:8%; right:25%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;opacity:0.4;";
    document.getElementById("upcomingRace").style =
      "top:8%; right:75%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;opacity:0.4;";

    document.getElementById("previous").style.color = "#ffd700";
    document.getElementById("current").style.color = "white";
    document.getElementById("upcoming").style.color = "white";
  };

  const handleCurr = () => {
    document.getElementById("currentRace").style =
      "top:5%; right:50%; transform: translate(50%,5%) scale(1);opacity:1;z-index:2;opacity:1;";
    document.getElementById("upcomingRace").style =
      "top:8%; right:25%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;opacity:0.4;";
    document.getElementById("prevRace").style =
      "top:8%; right:75%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;opacity:0.4;";

    document.getElementById("previous").style.color = "white";
    document.getElementById("current").style.color = "#ffd700";
    document.getElementById("upcoming").style.color = "white";
  };

  const handleUpcoming = () => {
    document.getElementById("upcomingRace").style =
      "top:5%; right:50%; transform: translate(50%,5%) scale(1);opacity:1;z-index:2;opacity:1;";
    document.getElementById("prevRace").style =
      "top:8%; right:25%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;opacity:0.4;";
    document.getElementById("currentRace").style =
      "top:8%; right:75%; transform: translate(50%,5%) scale(0.8);opacity:1;z-index:1;opacity:0.4;";

    document.getElementById("previous").style.color = "white";
    document.getElementById("current").style.color = "white";
    document.getElementById("upcoming").style.color = "#ffd700";
  };
  return (
    <>
      <ButtonGroup
        size="large"
        color="secondary"
        variant="text"
        aria-label="text button group"
      >
        <Button>
          <a
            href="#"
            id="previous"
            className="navigationItem"
            onClick={handlePrev}
            style={{
              backgroundColor: "transparent",
              fontFamily: "Russo One",
              color: "white",
              fontSize: "1.4rem",
            }}
          >
            PREVIOUS{" "}
          </a>
        </Button>

        <Button>
          {" "}
          <a
            href="#"

            id="current"
            style={{
              backgroundColor: "transparent",
              fontFamily: "Russo One",
              color: "#ffd700",
              fontSize: "1.4rem",
            }}
            onClick={handleCurr}
          >
            CURRENT{" "}
          </a>
        </Button>

        <Button>
          {" "}
          <a
            id="upcoming"
            href="#"

            onClick={handleUpcoming}
            style={{
              backgroundColor: "transparent",
              fontFamily: "Russo One",
              color: "white",
              fontSize: "1.4rem",
            }}
          >
            {" "}
            UPCOMING{" "}
          </a>
        </Button>
      </ButtonGroup>
     
    </>
  );
};

export default NavigationRace;
