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

const handleTrackClick = () => {};

const TrackLocator = () => {
  const [circuitData, setCircuitData] = useState([]);
  const [currLat, setCurrLat] = useState(0);
  const [currLong, setCurrLong] = useState(0);
  const [inputYear,setInputYear]=useState(2021);
  const [submitYear,setSubmitYear]=useState(2021);

  useEffect(() => {
   getData();
  }, [submitYear]);
    
  useEffect(() => {
    DisplayMap();
  }, [currLat, currLong]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let url = `http://ergast.com/api/f1/${submitYear}/circuits.json`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.MRData) {
          setCircuitData(response.data.MRData.CircuitTable.Circuits);
          console.log(response.data.MRData.CircuitTable.Circuits);
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

  const handleTrackClick = (lat, long, name) => {
    setCurrLat(lat);
    setCurrLong(long);
    document.getElementById("trackGrid").style.display = "none";
    document.getElementById("map").style.display = "";
    console.log(`${lat}  ${currLat}`);
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
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=hs3S6M6cLXWe5u0OssHP"
        />

        <Marker position={[currLat, currLong]} icon={newIcon}>
          <Popup>Track</Popup>
        </Marker>
      </MapContainer>
    );
  };

  return (
    <>
      <div id="trackGrid">
        <p style={{color:'white',textAlign:'center',fontSize:'1.5rem'}}>F1 Tracks {submitYear}</p>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:'2vh'}}>
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
                width: "8rem",
                  marginTop: "10px",
                  padding: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "rgba(206,147,9,0.9)",
                  border: "solid 2px black",
                  backgroundColor: "white ",
                  backdropFilter:"blur(10px)",
              }}
              onClick={handleSubmitYear}
            /></div>
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
                      track.circuitName
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
        <DisplayMap/>
      </div>
    </>
  );
};

export default TrackLocator;
