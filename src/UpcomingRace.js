import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const UpcomingRace = () => {
  const [upcomingRace, setUpcomingRace] = useState([]);
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
  }, [upcomingRace, currDate, currYear, currMonth, flag]);

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
          setUpcomingRace(response.data.MRData.RaceTable.Races);
          // console.log(response.data.MRData.RaceTable.Races);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const HandleDisplay = () => {
    if (upcomingRace && currDate && currMonth && currYear) {
      let upcomingRaceName, upcomingRaceRound, upcomingRaceDate;
      for (let i = 0; i < upcomingRace.length; i++) {
        let raceDay = upcomingRace[i].date;
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

        if (currYear == raceYear && raceDate - currDate > 2) {
          setFlag(true);
          //console.log(`${raceYear} ${raceMonth} ${raceDate}`);
          upcomingRaceName = upcomingRace[i].Circuit.circuitName;
          upcomingRaceRound = upcomingRace[i].round;
          upcomingRaceDate = `${raceDate} / ${raceMonth} / ${raceYear}`;

          break;
        } else {
          setFlag(false);
        }
      }

      return (
        <>
          {upcomingRace ? (
            flag ? (
              <p style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'2rem'}}>
                <span style={{color:'#ffd700',textAlign:'center',fontSize:'2rem',fontFamily:'Russo One'}}>{upcomingRaceName}</span>
                <span style={{textAlign:'center',fontSize:'2rem',fontFamily:'Russo One'}}>Round: {upcomingRaceRound}</span> 
                <span style={{textAlign:'center',fontSize:'1.5rem',fontFamily:'Russo One'}}>{upcomingRaceDate}</span>
              </p>
            ) : (
              <p>No upcoming race</p>
            )
          ) : (
            <div className="spinner"></div>
          )}
        </>
      );
    }

    return <div className="spinner"></div>;
  };

  return (
    <>
      <div id="upcomingRace">
        <HandleDisplay />
      </div>
    </>
  );
};

export default UpcomingRace;
