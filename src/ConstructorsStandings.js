import React, { useState, memo, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";

const ConstructorsStandings = () => {
  const [cStandings, setCStandings] = useState([]);
  const [inputYear, setInputYear] = useState(2022);
  const [inputRound, setInputRound] = useState(22);
  const [submitYear, setSubmitYear] = useState(2022);
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
          // console.log(
          //   response.data.MRData.StandingsTable.StandingsLists[0]
          //  );
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
                  width:'12vw',
                  marginRight: "10px",
                  fontSize: "12px",
                  color: "white",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "solid 2px black",
                  backgroundColor: "transparent",
                  fontFamily:'Russo One',
                }}
                placeholder={`${submitYear} (between  1958 to 2022)`}
                onChange={handleInputYear}
              />
              <input
                id="yearButton"
                type="submit"
                value="Submit Year"
                style={{
                  width: "7vw",
                  marginTop: "10px",
                  padding: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "rgba(206,147,9,0.9)",
                  border: "solid 2px black",
                  backgroundColor: "black ",
                  backdropFilter: "blur(10px)",
                  fontFamily:'Russo One',
                }}
                onClick={handleSubmitYear}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                id="round"
                type="text"
                style={{
                  width:'12vw',
                  marginRight: "10px",
                  fontSize: "12px",
                  color: "white",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "solid 2px black",
                  backgroundColor: "transparent",
                  fontFamily:'Russo One',
                }}
                placeholder={`${totalRounds} (Rounds between 1 and ${totalRounds})`}
                onChange={handleInputRound}
              />

              <input
                id="roundButton"
                type="submit"
                value="Submit Round"
                style={{
                  width: "7vw",
                  marginTop: "10px",
                  padding: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "rgba(206,147,9,0.9)",
                  border: "solid 2px black",
                  backgroundColor: "black ",
                  backdropFilter: "blur(10px)",
                  fontFamily:'Russo One',
                }}
                onClick={handleSubmitRound}
              />
            </div>
          </div>
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
            
          <ul className="standingsContainer2">
             
          {submitYear >= 1958 && submitYear <= 2022 ? (
            cStandings.map((constructor,index)=>{
              return (<li className="constructorsStandingsItems">
              <span style={{
                        color: "white",
                        textAlign: "center",
                        backgroundColor: "black",
                        marginLeft: "40px",
                        padding: "5px 5px 5px 5px",
                        border: "solid transparent 2px",
                        width: "3vw",
                        height: "5vh",
                      }}> {
                        (constructor.position==(index+1).toString() && (index+1==1 || index+1==2 || index+1==3  ))?<img  style={{width:'1.3vw',height:'2.8vh'}} src={require(`./Assets/${index+1}medal.png`)}/>:<p>{constructor.position}</p>}
        </span>
              <span  style={{
                        backgroundColor: "black",
                        marginLeft: "35px",
                        width: "17vw",
                        padding: "7px 7px 7px 7px",
                      }}>
                {constructor.Constructor.name}
              </span>
              <span style={{
                        textAlign: "center",
                        backgroundColor: "black",
                        marginLeft: "20px",
                        width: "6vw",
                        height: "4vh",
                        padding: "5px 5px 5px 5px",
                      }}>
                {constructor.points}
              </span>
              <span
                      style={{
                        color: "white",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        width: "2vw",
                        height: "4vh",
                        padding: "5px 5px 5px 5px",
                      }}
                    >
                      pts
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
