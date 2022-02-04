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
          //console.log(response.data.MRData.RaceTable.Races);
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
          <div  style={{display:'flex',flexDirection:'column',gap:'2rem'}} key='1'>
          <p style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontFamily:'Russo One'}}>
            <p style={{color:'#ffd700',fontSize:'2rem'}}>{prevRace[0].Circuit.circuitName} {prevRace[0].season}</p> <p style={{fontSize:'2rem'}}> Round: {prevRace[0].round}</p>
          </p>
          <p style={{fontFamily:'Russo One',}}>
            <img  style={{width:'2vw',height:'3.5vh',marginRight:'2vh'}}src={require('./Assets/1medal.png')}/>
          <span style={{textAlign:'center',fontSize:'1.5rem'}}>{prevRace[0].Results[0].Driver.givenName} {prevRace[0].Results[0].Driver.familyName}</span>
          </p>
          <p style={{fontFamily:'Russo One',}}>
            <img  style={{width:'2vw',height:'3.5vh',marginRight:'2vh'}}src={require('./Assets/2medal.png')}/>
          <span style={{textAlign:'center',fontSize:'1.5rem'}}>{prevRace[0].Results[1].Driver.givenName} {prevRace[0].Results[1].Driver.familyName}</span>
          </p>
          <p style={{fontFamily:'Russo One',}}>
            <img  style={{width:'2vw',height:'3.5vh',marginRight:'2vh'}}src={require('./Assets/3medal.png')}/>
          <span style={{textAlign:'center',fontSize:'1.5rem'}}>{prevRace[0].Results[2].Driver.givenName} {prevRace[0].Results[2].Driver.familyName}</span>
          </p>
         
          </div>
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
};

export default PrevRace;
