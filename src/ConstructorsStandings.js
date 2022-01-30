import React, { useState, memo, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";

const ConstructorsStandings = () => {
  const [cStandings, setCStandings] = useState([]);
  const [input, setInput] = useState(2021);
  const [submit, setSubmit] = useState(2021);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const url = `//ergast.com/api/f1/${input}/constructorStandings.json`;
    axios(url)
      .then((response) => {
        if (response.data.MRData) {
          setCStandings(
            response.data.MRData.StandingsTable.StandingsLists[0]
              .ConstructorStandings
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {cStandings[0] ? (
        <div className="standingsContainer">
          <div style={{ margin: "20px", backgroundColor: "transparent" }}>
            <input
              type="text"
              style={{
                marginRight: "10px",
                fontSize: "14px",
                color: "white",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "solid 2px black",
                backgroundColor: "transparent",
              }}
              placeholder="between  1950 to 2021"
              onChange={handleInput}
            />
            <input
              type="submit"
              value="Submit"
              style={{
                padding: "10px",
                cursor: "pointer",
                fontSize: "12px",
                color: "white",
                border: "solid 2px black",
                backgroundColor: "black",
              }}
              onClick={handleSubmit}
            />
          </div>
          {(input>=1950 && input<=2022)?
          <div className="standingsContainer2">
          <p id="standingsTitle"> <img src={require('./f1Logo.png')} style={{backgroundColor:'transparent',height:'50px',width:'50px'}}/>Constructors Standings {submit}</p>
          <p className="constructorsStandingsItems">
            <span style={{ backgroundColor: "transparent" }}>1</span>
            <span style={{ backgroundColor: "transparent" }}> {cStandings[0].Constructor.name}</span>{" "}
            <span style={{ backgroundColor: "transparent" }}>{cStandings[0].points}</span>
          </p>

          <p className="constructorsStandingsItems">
            <span style={{ backgroundColor: "transparent" }}>2</span>
            <span style={{ backgroundColor: "transparent" }}> {cStandings[1].Constructor.name}</span>{" "}
            <span style={{ backgroundColor: "transparent" }}>{cStandings[1].points}</span>
          </p>

          <p className="constructorsStandingsItems">
            <span style={{ backgroundColor: "transparent" }}>3</span>
            <span style={{ backgroundColor: "transparent" }}> {cStandings[2].Constructor.name}</span>{" "}
            <span style={{ backgroundColor: "transparent" }}>{cStandings[2].points}</span>
          </p>

          <p className="constructorsStandingsItems">
            <span style={{ backgroundColor: "transparent" }}>4</span>
            <span style={{ backgroundColor: "transparent" }}> {cStandings[3].Constructor.name}</span>{" "}
            <span style={{ backgroundColor: "transparent" }}>{cStandings[3].points}</span>
          </p>

          <p className="constructorsStandingsItems">
            <span style={{ backgroundColor: "transparent" }}>5</span>
            <span style={{ backgroundColor: "transparent" }}> {cStandings[4].Constructor.name}</span>{" "}
            <span style={{ backgroundColor: "transparent" }}>{cStandings[4].points}</span>
          </p>
        </div>:<p className="driverStandingsItems">Data only available from 1950 to 2021</p>}
        </div>
      ) : (
        <div
          className="standingsContainer"
          style={{ justifyContent: "center" }}
        >
          <img
            src={require("./loading.png")}
            style={{
              backgroundColor: "transparent",
              height: "100px",
              width: "100px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ConstructorsStandings;
