import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const PrevRace = () => {
  const [prevRace, setPrevRace] = useState([]);

  useEffect(() => {
    getDataPrevRace();
  }, []);

  const getDataPrevRace = () => {
    let url = `//ergast.com/api/f1/current/last/results.json`;
    axios(url)
      .then((response) => {
        if (response.data.MRData) {
          setPrevRace(response.data.MRData.RaceTable.Races);
          console.log(response.data.MRData.RaceTable.Races);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div id="prevRace">
        {prevRace[0]? (
          <div key='1'>
          <p>
            {prevRace[0].Circuit.circuitName} {prevRace[0].season}
          </p>
          <p>{prevRace[0].Results[0].Driver.givenName} {prevRace[0].Results[0].Driver.familyName}</p>
          <p>{prevRace[0].Results[1].Driver.givenName} {prevRace[0].Results[1].Driver.familyName}</p>
          <p>{prevRace[0].Results[2].Driver.givenName} {prevRace[0].Results[2].Driver.familyName}</p>
          </div>
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
};

export default PrevRace;
