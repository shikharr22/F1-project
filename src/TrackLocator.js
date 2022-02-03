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
  iconSize: [50, 50],
});

const TrackLocator = () => {
  const [circuitData, setCircuitData] = useState([]);
  const [currLat, setCurrLat] = useState(0);
  const [currName, setCurrName] = useState("");
  const [currLong, setCurrLong] = useState(0);
  const [currCircuitId, setCurrCircuitId] = useState("");
  const [inputYear, setInputYear] = useState(2021);
  const [submitYear, setSubmitYear] = useState(2021);
  const [raceResultsData, setRaceResultsData] = useState([]);
  const [qualiResultsData, setQualiResultsData] = useState([]);
  const [startingGrid,setStartingGrid]=useState([]);
  const [raceToggle,setRaceToggle]=useState('none');
  const [mapView,setMapView]=useState("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=hs3S6M6cLXWe5u0OssHP");

  useEffect(() => {
    getDataCircuit();
  }, [submitYear]);

   useEffect(()=>{
    updateStartingGrid();
    console.log(startingGrid);
   },[raceResultsData])

  useEffect(() => {
    getDataRaceResults();
    getDataQualiResults();
    DisplayMap();
    
  }, [currLat, currLong, submitYear,mapView]);

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
    setCurrName(name);
    document.getElementById("trackGrid").style.display = "none";
    document.getElementById("map").style.display = "";
  };
  const handleInputYear = (e) => {
    setInputYear(e.target.value);
  };
  const handleSubmitYear = (e) => {
    setSubmitYear(inputYear);
  };

  const compare=( a, b )=>{
    if ( a.grid < b.grid){
      return -1;
    }
    if ( a.grid> b.grid){
      return 1;
    }
    return 0;
  }

  const updateStartingGrid=()=>{
    let temp=[];
    if(raceResultsData)
    {
      
      raceResultsData.map((driver)=>{
         temp.push({'code':driver.Driver.code,'grid':Number(driver.grid)});
      })
      temp.sort(compare);
      setStartingGrid(temp);
    }

  }

  const DisplayMap = () => {
    return (
      <MapContainer
        center={[currLat, currLong]}
        zoom={15}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url={mapView}
        />
        <Marker position={[currLat, currLong]} icon={newIcon}>
          <Popup>Track</Popup>
        </Marker>
        <div id="trackName">{currName}</div>
        <span
          style={{
            display: "flex",
            gap: "1rem",
            position: "absolute",
            top: "12%",
            left: "1%",
            zIndex: 10000,
            color: "#edcb53",
            backgroundColor: "transparent",
          }}
        >
          <p style={{color:'black',fontSize:'1.2rem',backgroundColor:'#edcb53',padding:'2px',borderRadius:'5px'}}>Quali Results {submitYear}</p>
        
          <img
            style={{ cursor: "pointer",width:'20px',height:'20px'}}
            src={require('./Assets/expand.png')}
            onClick={() => {
              document.getElementById("mapQualiResults").style.display = "";
            }}
          />
           <img
            style={{ cursor: "pointer",width:'20px',height:'20px'}}
            src={require('./Assets/minimise.png')}
            onClick={() => {
              document.getElementById("mapQualiResults").style.display = "none";
            }}
          />
          
        </span>
        <ul id="mapQualiResults" style={{display:raceToggle}}>
          {qualiResultsData && submitYear >= 2004  && submitYear<=2021? (
            qualiResultsData.slice(0, 3).map((element) => {
              return (
                <li key={element.position} className="mapQualiResultsItem">
                  {" "}
                  <span style={{marginRight:'10px'}}>{element.position}</span> <span style={{marginRight:'5px'}}>{element.Driver.givenName}</span>
                  <span style={{marginRight:'10px'}}>{element.Driver.familyName}</span> <span style={{marginRight:'10px',color:'#edcb53'}}>{element.Q1} min</span> <span style={{marginRight:'10px',color:'#edcb53'}}>{(element.Q2)?`${element.Q2} min`:<p>No Data</p>}</span>
                  <span style={{marginRight:'10px',color:'#edcb53'}}>{(element.Q3)?`${element.Q3} min`:<p>No data</p>} </span>
                </li>
              );
            })
          ) : (
            <div className="spinner"></div>
          )}
        </ul>
        <span
          style={{
            display: "flex",
            gap: "1rem",
            position: "absolute",
            top: "12%",
            left: "40%",
            zIndex: 10000,
            color: "#edcb53",
            backgroundColor: "transparent",
          }}
        >
          <p style={{color:'black',fontSize:'1.2rem',backgroundColor:'#edcb53',padding:'2px',borderRadius:'5px'}}>Race Results {submitYear}</p>
          <img
            style={{ cursor: "pointer",width:'20px',height:'20px'}}
            src={require('./Assets/expand.png')}
            onClick={() => {
              document.getElementById("mapRaceResults").style.display = "";
            }}
          />
           <img
            style={{ cursor: "pointer",width:'20px',height:'20px'}}
            src={require('./Assets/minimise.png')}
            onClick={() => {
              document.getElementById("mapRaceResults").style.display = "none";
            }}
          />
        </span>
        <ul id="mapRaceResults" style={{display:raceToggle}}>
          {raceResultsData && submitYear >= 2004  && submitYear<=2021? (
            raceResultsData.slice(0, 3).map((element) => {
              return (
                <li key={element.position} className="mapRaceResultsItem">
                  
                  <span style={{marginRight:'10px'}}>{element.position}</span> <span style={{marginRight:'10px'}}>{element.Driver.givenName}</span>
                  <span style={{marginRight:'10px'}}>{element.Driver.familyName}</span>  <span style={{marginRight:'10px',color:'#edcb53'}}>{element.Time.time} min</span>
                   <span style={{marginRight:'10px',color:'#edcb53'}}>Laps : {element.laps}</span> <span style={{marginRight:'10px',color:'#edcb53'}}> Started at:  {element.grid}</span>
                </li>
              );
            })
          ) : (
            <div className="spinner"></div>
          )}
        </ul>
        <span
          style={{
            display: "flex",
            gap: "1rem",
            position: "absolute",
            top: "12%",
            left: "79%",
            zIndex: 10000,
            color: "#edcb53",
            backgroundColor: "transparent",
          }}
        >
          <p style={{color:'black',fontSize:'1.2rem',backgroundColor:'#edcb53',padding:'2px',borderRadius:'5px'}}>Starting Grid {submitYear}</p>
        
          <img
            style={{ cursor: "pointer",width:'20px',height:'20px'}}
            src={require('./Assets/expand.png')}
            onClick={() => {
              document.getElementById("startingGrid").style.display = "";
            }}
          />
           <img
            style={{ cursor: "pointer",width:'20px',height:'20px'}}
            src={require('./Assets/minimise.png')}
            onClick={() => {
              document.getElementById("startingGrid").style.display = "none";
            }}
          />
        </span>
        <ul id="startingGrid" style={{display:raceToggle}}>
         {startingGrid?startingGrid.map((element,index)=>{
           return (
             <li style={{marginLeft:(index%2==0)?'0px':'40px'}} className='startingGridItem'>{element.code?<p>{element.code}</p>:<p>-----</p>}</li>
              
           );
         }):<div className="spinner"></div>}
        </ul>
      </MapContainer>
    );
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "2%",
          left: "5%",
          width: "20px",
          height: "20px",
          zIndex: 1000000 ,
        }}
      >
        <p>
          <a style={{ color: "#edcb53", fontSize: "1.5rem" }} href="/">
            Home
          </a>
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "15%",
          width: "20px",
          height: "20px",
          zIndex: 1000,
          cursor:'pointer',
        }}
      >
        <p>
          <a style={{ color: "black", fontSize: "1.5rem" }} onClick={()=>{
            setMapView("https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=hs3S6M6cLXWe5u0OssHP");
          }}>
            Satellite 
          </a>
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "15%",
          width: "20px",
          height: "20px",
          zIndex: 1000,
          cursor:'pointer',
        }}
      >
        <p>
          <a style={{ color: "black",fontSize: "1.5rem" }} onClick={()=>{
            setMapView("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=hs3S6M6cLXWe5u0OssHP");
          }}>
            Street 
          </a>
        </p>
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
                borderBottom: "solid 2px white",
                backgroundColor: "transparent",
              }}
              placeholder={`${submitYear} (between  2004 to 2021)`}
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
