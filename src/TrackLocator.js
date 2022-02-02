import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import axios from "axios";
import L, { map } from "leaflet";

const newIcon = new L.icon({
  iconUrl: require("./Assets/f1Logo.png"),
  iconSize: [30, 30],
});



const TrackLocator = () => {
  const [circuitData, setCircuitData] = useState([]);
  const [currLat, setCurrLat] = useState(0);
  const [currLong, setCurrLong] = useState(0);
  const [currCircuitId, setCurrCircuitId] = useState("");
  const [inputYear, setInputYear] = useState(2021);
  const [submitYear, setSubmitYear] = useState(2021);
  const [raceResultsData, setRaceResultsData] = useState([]);
  const [qualiResultsData, setQualiResultsData] = useState([]);

  useEffect(() => {
    getDataCircuit();
  }, [submitYear]);

  useEffect(() => {
    getDataRaceResults();
    getDataQualiResults();
    DisplayMap();
    
  }, [currLat, currLong,submitYear]);

  useEffect(() => {
    getDataCircuit();
  }, []);

  const getDataCircuit = () => {
    let url = `//ergast.com/api/f1/${submitYear}/circuits.json`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.MRData) {
          setCircuitData(response.data.MRData.CircuitTable.Circuits);
        }
      })
      .catch((error) => console.log(error));
  };

  const getDataQualiResults = () => {
    let url = `//ergast.com/api/f1/${submitYear}/circuits/${currCircuitId}/qualifying.json`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.MRData) {
          setQualiResultsData(
            response.data.MRData.RaceTable.Races[0].QualifyingResults
          );
          //console.log( response.data.MRData.RaceTable.Races[0].QualifyingResults);
        }
      })
      .catch((error) => console.log(error));
  };

  const getDataRaceResults = () => {
    let url = `//ergast.com/api/f1/${submitYear}/circuits/${currCircuitId}/results.json`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.MRData) {
          setRaceResultsData(response.data.MRData.RaceTable.Races[0].Results);
          //console.log(response.data.MRData.RaceTable.Races[0].Results);
        }
      })
      .catch((error) => console.log(error));
  };

  

  const handleClose = () => {
    document.getElementById("trackGrid").style.display = "none";
    document.getElementById("map").style.display = "";
  };

  const handleOpen = () => {
    document.getElementById("trackGrid").style.display = "";
    document.getElementById("map").style.display = "none";
  };

  const handleTrackClick = (lat, long, name, circuitId) => {
    setCurrLat(lat);
    setCurrLong(long);
    setCurrCircuitId(circuitId);
    document.getElementById("trackGrid").style.display = "none";
    document.getElementById("map").style.display = "";
    
  };
  const handleInputYear = (e) => {
    setInputYear(e.target.value);
  };
  const handleSubmitYear = (e) => {
    setSubmitYear(inputYear);
  };

  const DisplayMap = () => {
    return (
      <MapContainer
        center={[currLat, currLong]}
        zoom={15}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=QkED1iePDvCcom4eQXlU"
        />

        <Marker position={[currLat, currLong]} icon={newIcon}>
          <Popup>Track</Popup>
        </Marker>
           <ul id="mapQualiResults">
          <p>Qualification Results {submitYear}</p>
          {qualiResultsData && submitYear>=2004 ? (
            qualiResultsData.slice(0, 3).map((element) => {
              return (
                <li  key={element.position} className="mapQualiResultsItem">
                  {" "}
                  {element.position} {element.Driver.givenName}{" "}
                  {element.Driver.familyName}{" "}
                  {element.Q1}min {" "} {element.Q2}min {" "} {element.Q3}min
                </li>
              );
            })
          ) : (
            <div className="spinner"></div>
          )}
        </ul>
        

        <ul id="mapRaceResults">
          <p>Race Results {submitYear}</p>
          {raceResultsData  && submitYear>=2004? (
            raceResultsData.slice(0, 3).map((element) => {
              return (
                <li  key={element.position} className="mapRaceResultsItem">
                  {" "}
                  {element.position} {element.Driver.givenName}{" "}
                  {element.Driver.familyName}{" "}
               
                  {element.Time.time}min   {" "}
                  {element.laps} {" "}
                  {element.grid}starting grid

                </li>
              );
            })
          ) : (
            <div className="spinner"></div>
          )}
        </ul>
      </MapContainer>
    );
  };

  return (
    <>
    <div style={{position:'absolute',top:'2%',left:'5%', width:'20px',height:'20px',zIndex:100000}}>
      <p><a  style={{color:'white',fontSize:'1rem'}} href='/'>Home</a></p>
    </div>
      <div id="trackGrid">
        <p style={{ color: "white", textAlign: "center", fontSize: "1.5rem" }}>
          F1 Tracks {submitYear}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2vh",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
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
                width: "8rem",
                marginTop: "10px",
                padding: "5px",
                cursor: "pointer",
                fontSize: "12px",
                color: "rgba(206,147,9,0.9)",
                border: "solid 2px black",
                backgroundColor: "white ",
                backdropFilter: "blur(10px)",
              }}
              onClick={handleSubmitYear}
            />
          </div>
        </div>
        <ul id="trackList">
          {circuitData ? (
            circuitData.map((track) => {
              return (
                <li
                  key={track.circuitId}
                  onClick={() =>
                    handleTrackClick(
                      track.Location.lat,
                      track.Location.long,
                      track.circuitName,
                      track.circuitId
                    )
                  }
                  className="trackListItem"
                >
                  {track.circuitName}
                </li>
              );
            })
          ) : (
            <div className="spinner"></div>
          )}
        </ul>
        <img
          id="closeButton"
          src={require("./Assets/close.png")}
          onClick={handleClose}
        />
      </div>
      <div id="map">
        <img
          id="openButton"
          src={require("./Assets/open.png")}
          onClick={handleOpen}
        />
        <DisplayMap />
      </div>
    </>
  );
};

export default TrackLocator;
