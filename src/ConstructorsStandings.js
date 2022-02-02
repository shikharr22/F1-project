import React, { useState, memo, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";

const ConstructorsStandings = () => {
  const [cStandings, setCStandings] = useState([]);
  const [inputYear, setInputYear] = useState(2021);
  const [inputRound, setInputRound] = useState(22);
  const [submitYear, setSubmitYear] = useState(2021);
  const [totalRounds, setTotalRounds] = useState(22);
  const [submitRound, setSubmitRound] = useState(totalRounds);

  const handleInputYear = (e) => {
    setInputYear(e.target.value);
  };

  const handleInputRound = (e) => {
    setInputRound(e.target.value);
  };

  const handleSubmitYear = (e) => {
    setSubmitYear(inputYear);
  };

  const handleSubmitRound = (e) => {
    setSubmitRound(inputRound);
  };

  useEffect(() => {
    getDataYear();
  }, [submitYear]);

  useEffect(() => {
    getDataRound();
  }, [submitRound]);

  useEffect(() => {
    getDataYear();
  }, []);

  const getDataYear = () => {
    const url = `//ergast.com/api/f1/${submitYear}/constructorStandings.json`;
    axios(url)
      .then((response) => {
        if (response.data.MRData) {
          setCStandings(
            response.data.MRData.StandingsTable.StandingsLists[0]
              .ConstructorStandings
          );
          setTotalRounds(
            response.data.MRData.StandingsTable.StandingsLists[0].round
          );
          console.log(
            response.data.MRData.StandingsTable.StandingsLists[0]
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataRound = () => {
    const url = `//ergast.com/api/f1/${submitYear}/${submitRound}/constructorStandings.json`;
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "20px",
              backgroundColor: "transparent",
            }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                id="year"
                type="text"
                style={{
                  marginRight: "10px",
                  fontSize: "12px",
                  color: "white",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "solid 2px black",
                  backgroundColor: "transparent",
                }}
                placeholder={`${submitYear} (between  1958 to 2022)`}
                onChange={handleInputYear}
              />
              <input
                id="yearButton"
                type="submit"
                value="Submit Year"
                style={{
                  width: "9rem",
                  marginTop: "10px",
                  padding: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "rgba(206,147,9,0.9)",
                  border: "solid 2px black",
                  backgroundColor: "black ",
                  backdropFilter: "blur(10px)",
                }}
                onClick={handleSubmitYear}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                id="round"
                type="text"
                style={{
                  marginRight: "10px",
                  fontSize: "12px",
                  color: "white",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "solid 2px black",
                  backgroundColor: "transparent",
                }}
                placeholder={`${totalRounds} (Rounds between 1 and ${totalRounds})`}
                onChange={handleInputRound}
              />

              <input
                id="roundButton"
                type="submit"
                value="Submit Round"
                style={{
                  width: "9rem",
                  marginTop: "10px",
                  padding: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "rgba(206,147,9,0.9)",
                  border: "solid 2px black",
                  backgroundColor: "black ",
                  backdropFilter: "blur(10px)",
                }}
                onClick={handleSubmitRound}
              />
            </div>
          </div>
          <ul className="standingsContainer2">
              <p id="standingsTitle">
                {" "}
                <img
                  src={require("./Assets/f1Logo.png")}
                  style={{
                    backgroundColor: "transparent",
                    height: "50px",
                    width: "50px",
                  }}
                />
                Constructors Standings {submitYear}
              </p>
            
          {submitYear >= 1958 && submitYear <= 2022 ? (
            cStandings.map((constructor)=>{
              return (<li className="constructorsStandingsItems">
              <span style={{ backgroundColor: "transparent" }}>{constructor.position}</span>
              <span style={{ backgroundColor: "transparent" }}>
                {constructor.Constructor.name}
              </span>
              <span style={{ backgroundColor: "transparent" }}>
                {constructor.points}
              </span>
            </li>);
            })
           
             
          ) : (
            <p className="driverStandingsItems">
              Data only available from 1958 to 2021
            </p>
          )}
        </ul>
        </div>
      ) : (
        <div
          className="standingsContainer"
          style={{ justifyContent: "center" }}
        >
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

export default ConstructorsStandings;
