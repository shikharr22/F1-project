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

  useEffect(()=>{
    getDataRound();
  },[submitRound])


  useEffect(() => {
    getDataYear();
  }, []);


  const getDataYear= () => {
    const url = `//ergast.com/api/f1/${submitYear}/constructorStandings.json`;
    axios(url)
      .then((response) => {
        if (response.data.MRData) {
          setCStandings(
            response.data.MRData.StandingsTable.StandingsLists[0]
              .ConstructorStandings
          );
          setTotalRounds(response.data.MRData.StandingsTable.StandingsLists[0].round);
          console.log(response.data.MRData.StandingsTable.StandingsLists[0].round);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataRound= () => {
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
           <div style={{ display:'flex',flexDirection:'column',justifyContent:'center', margin: "20px", backgroundColor: "transparent" }}>
           <div style={{display:'flex',gap:'1rem'}}><input
              id="year"
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
              placeholder={`${submitYear} (between  1958 to 2021)`}
              onChange={handleInputYear}
            />
            <input
              id="yearButton"
              type="submit"
              value="Submit Year"
              style={{
                marginTop:'10px',
                padding: "10px",
                cursor: "pointer",
                fontSize: "12px",
                color: "white",
                border: "solid 2px black",
                backgroundColor: "black",
              }}
              onClick={handleSubmitYear}
            /></div>
            <div style={{display:'flex',gap:'1rem'}}>
              <input
              id="round"
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
              placeholder={`${totalRounds} (Rounds between 1 and ${totalRounds})`}
              onChange={handleInputRound}
            />

             <input
             id="roundButton"
              type="submit"
              value="Submit Round"
              style={{
                marginTop: "10px",
                padding: "10px",
                cursor: "pointer",
                fontSize: "12px",
                color: "white",
                border: "solid 2px black",
                backgroundColor: "black",
              }}
              onClick={handleSubmitRound}
            />
          </div>
          </div>
          {(submitYear>=1958 && submitYear<=2022)?
          <div className="standingsContainer2">
          <p id="standingsTitle"> <img src={require('./Assets/f1Logo.png')} style={{backgroundColor:'transparent',height:'50px',width:'50px'}}/>Constructors Standings {submitYear}</p>
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
        </div>:<p className="driverStandingsItems">Data only available from 1958 to 2021</p>}
        </div>
      ) : (
        <div
          className="standingsContainer"
          style={{ justifyContent: "center" }}
        >
          <img
            src={require("./Assets/loading.png")}
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
