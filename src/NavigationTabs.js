import React, { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

const NavigationTabs = () => {
  const [flag1, setFlag1] = useState(1);
  const [flag2, setFlag2] = useState(1);
  const [flag3, setFlag3] = useState(1);
  const [flag4, setFlag4] = useState(1);
  return (
    <>
      <div id="navigationTabs">
        <div className="tabs">
          <a
            href="#standings"
            style={{ backgroundColor: "transparent" }}
            onMouseOver={() => setFlag1(2)}
            onMouseOut={() => setFlag1(1)}
          >
            <img
              style={{ width: "90%", height: "100%" }}
              src={require(`./Assets/driversStandings${flag1}.png`)}
            />
          </a>
        </div>
        <div className="tabs">
          <a
            href="#standings"
            style={{ backgroundColor: "transparent" }}
            onMouseOver={() => setFlag2(2)}
            onMouseOut={() => setFlag2(1)}
          >
            <img
              style={{
                width: "90%",
                height: "100%",
                backgroundColor: "transparent",
              }}
              src={require(`./Assets/ConstructorsStandings${flag2}.png`)}
            />
          </a>
        </div>
        <div className="tabs">
          <a
            href="#news"
            style={{ backgroundColor: "transparent" }}
            onMouseOver={() => setFlag3(2)}
            onMouseOut={() => setFlag3(1)}
          >
            <img
              style={{
                width: "90%",
                height: "100%",
                backgroundColor: "transparent",
              }}
              src={require(`./Assets/news${flag3}.png`)}
            />
          </a>
        </div>
        <div className="tabs">
         
          <a
            href="/TrackLocator"
            target="_blank"
            style={{ backgroundColor: "transparent" }}
            onMouseOver={() => setFlag4(2)}
            onMouseOut={() => setFlag4(1)}
          >
            <img
              style={{ width: "90%", height: "100%" }}
              src={require(`./Assets/trackLocator${flag4}.png`)}
            />
          </a>
        
        </div>
      </div>
    </>
  );
};

export default NavigationTabs;
