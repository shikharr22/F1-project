import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const CurrRace = () => {
  const [currRace, setCurrRace] = useState([]);
  const [currDate, setCurrDate] = useState(null);
  const [currMonth, setCurrMonth] = useState(null);
  const [currYear, setCurrYear] = useState(null);
  const [flag, setFlag] = useState(false);

  const handleCurrDate = () => {
    let today = new Date().toISOString().slice(0, 10);
    setCurrYear(Number(today.slice(0, 4)));
    let month = today.slice(5, 7);
    if (month[0] == "0") {
      month = Number(month[1]);
    } else {
      month = Number(month);
    }
    setCurrMonth(month);

    let date = today.slice(8, 10);
    if (date[0] == "0") {
      date = Number(date[1]);
    } else {
      date = Number(date);
    }
    setCurrDate(date);
  };

  useEffect(() => {
    HandleDisplay();
  }, [currRace, currDate, currYear, currMonth, flag]);

  useEffect(() => {
    handleCurrDate();
  }, [currDate, currMonth, currYear]);

  useEffect(() => {
    getDataRaceSchedule();
  }, []);

  const getDataRaceSchedule = () => {
    let url = `//ergast.com/api/f1/2022.json`;
    axios(url)
      .then((response) => {
        if (response.data.MRData) {
          setCurrRace(response.data.MRData.RaceTable.Races);
          // console.log(response.data.MRData.RaceTable.Races);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleDisplay = () => {
    if (currRace && currDate && currMonth && currYear) {
      let currRaceName, currRaceRound, currRaceDate;
      for (let i = 0; i < currRace.length; i++) {
        let raceDay = currRace[i].date;
        let raceDate;
        let raceYear;
        let raceMonth;

        raceYear = Number(raceDay.slice(0, 4));
        raceMonth = raceDay.slice(5, 7);
        if (raceMonth[0] == "0") {
          raceMonth = Number(raceMonth[1]);
        } else {
          raceMonth = Number(raceMonth);
        }

        raceDate = raceDay.slice(8, 10);
        if (raceDate[0] == "0") {
          raceDate = Number(raceDate[1]);
        } else {
          raceDate = Number(raceDate);
        }
        
      
     
        if (
          currYear == raceYear &&
          currMonth == raceMonth &&
          (raceDate - currDate)<= 2 && (raceDate-currDate)>=0
        ) {
          setFlag(true);
          currRaceName = currRace[i].Circuit.circuitName;
          currRaceRound = currRace[i].round;
          currRaceDate = `${raceDate} / ${raceMonth} / ${raceYear}`;
          break;
        } else {
          setFlag(false);
        }
      }

      return (
        <>
          {flag ? (
            <p
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Russo One",
              }}
            >
              <span style={{ color:'#ffd700',fontSize: "1.5rem" }}>{currRaceName}</span>
              <span style={{ fontSize: "1.5rem" }}>Round {currRaceRound}</span>
              <span style={{ fontSize: "1.5rem", marginTop: "2vh" }}>
                {currRaceDate}
              </span>

              <a
                style={{
                  textDecoration: "none",
                  fontSize: "1.5rem",
                  color: "#ffd700",
                  marginTop: "2vh",
                }}
                href="//www.formula1.com/en/f1-live.html"
                target="_blank"
              >
                Formula One Live Timings
              </a>
            </p>
          ) : (
             <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
              <img  style={{width:'100%',height:'30vh'}}src={require('./Assets/noLiveAction.gif')}/>
              </div>
          )}
        </>
      );
    }

    return <div className="spinner"></div>;
  };

  return (
    <>
      <div id="currentRace">
        <HandleDisplay />
      </div>
    </>
  );
};

export default CurrRace;
