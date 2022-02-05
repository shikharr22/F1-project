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
import { borderRadius } from "@mui/system";

const newIcon = new L.icon({
  iconUrl: require("./Assets/f1Logo.png"),
  iconSize: [50, 50],
});

const TrackLocator = () => {
  const [circuitData, setCircuitData] = useState([]);
  const [currLat, setCurrLat] = useState(0);
  const [currName, setCurrName] = useState("");
  const [currLocality, setCurrLocality] = useState("");
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
    //console.log(startingGrid);
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
          console.log(response.data.MRData.CircuitTable.Circuits);
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
          console.log( response.data.MRData.RaceTable.Races[0].QualifyingResults);
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
          console.log(response.data.MRData.RaceTable.Races[0].Results);
        }
      })
      .catch((error) => console.log(error));
  };



  const handleOpen = () => {
    document.getElementById("gridContainer").style.display = "";
    document.getElementById("map").style.display = "none";
  };

  const handleTrackClick = (lat, long, name, circuitId,locality) => {
    setCurrLat(lat);
    setCurrLong(long);
    setCurrCircuitId(circuitId);
    setCurrName(name);
    setCurrLocality(locality);
    document.getElementById("gridContainer").style.display = "none";
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
         temp.push({'code':(driver.Driver.code)?driver.Driver.code:driver.Driver.familyName.slice(0,3),'grid':Number(driver.grid),'name':`${driver.Driver.givenName} ${driver.Driver.familyName}`});
      })
      temp.sort(compare);
      if(temp[0] && temp[0].grid==0)
      {
        let d=temp[0];
        temp=temp.slice(1,temp.length);
        temp.push(d);
      }
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
        <div id="trackName">{currName} ,{currLocality}</div>
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
          <p style={{fontFamily:'Russo One',color:'#ffd700',fontSize:'1.2rem',backgroundColor:'#A50021',padding:'1vh',borderRadius:'5px'}}>Quali Results {submitYear}</p>

          <img
            style={{ cursor: "pointer",width:'1.5vw',height:'3vh'}}
            src={require('./Assets/expand.png')}
            onClick={() => {
              document.getElementById("mapQualiResults").style.display = "";
            }}
          />
           <img
            style={{ cursor: "pointer",width:'1.5vw',height:'3vh'}}
            src={require('./Assets/minimise.png')}
            onClick={() => {
              document.getElementById("mapQualiResults").style.display = "none";
            }}
          />

        </span>
        <ul id="mapQualiResults" style={{display:raceToggle}}>
          {qualiResultsData && submitYear >= 2004  && submitYear<=2021? (
            qualiResultsData.slice(0,5).map((element,index) => {
              return (
                <li key={element.position} className="mapQualiResultsItem">
                  <span style={{marginLeft:'0px',width:'10%'}}>{
                      (element.position==(index+1).toString() && (index+1==1 || index+1==2 || index+1==3  ))?<img  style={{width:'1.4vw',height:'2.7vh'}} src={require(`./Assets/${index+1}medal.png`)}/>:<p>{element.position}</p>}
      </span> 
                  <span style={{marginLeft:'0px',width:'20%'}}>{element.Driver.givenName} {element.Driver.familyName}</span>
                  <span style={{marginLeft:'0px',width:'20%',color:'#ffd700'}}><span style={{color:'white'}}>Q1:{" "}</span>{element.Q1}min</span> 
                  <span style={{marginLeft:'0px',width:'20%',color:'#ffd700'}}><span style={{color:'white'}}>Q2:{" "}</span>{(element.Q2)?`${element.Q2} min`:<p>----</p>}</span>
                  <span style={{marginLeft:'0px',width:'20%',color:'#ffd700'}}><span style={{color:'white'}}>Q3:{" "}</span>{(element.Q3)?`${element.Q3} min`:<p>----</p>} </span>
                </li>
              );
            })
          ) : (
            <p style={{marginTop:'4vh',width:'auto',fontFamily:'Russo One',color:'#ffd700',fontSize:'1.2rem',backgroundColor:'#A50021',padding:'1vh',borderRadius:'5px'}}>Qualifications data only available from 2003</p>
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
          <p style={{fontFamily:'Russo One',color:'#ffd700',fontSize:'1.2rem',backgroundColor:'#A50021',padding:'1vh',borderRadius:'5px'}}>Race Results {submitYear}</p>
          <img
             style={{ cursor: "pointer",width:'1.5vw',height:'3vh'}}
            src={require('./Assets/expand.png')}
            onClick={() => {
              document.getElementById("mapRaceResults").style.display = "";
            }}
          />
           <img
            style={{ cursor: "pointer",width:'1.5vw',height:'3vh'}}
            src={require('./Assets/minimise.png')}
            onClick={() => {
              document.getElementById("mapRaceResults").style.display = "none";
            }}
          />
        </span>
        <ul id="mapRaceResults" style={{display:raceToggle}}>
          {raceResultsData && submitYear>=1950  && submitYear<=2021? (
            raceResultsData.slice(0,5).map((element,index) => {
              return (
                <li key={element.position} className="mapRaceResultsItem">

                  <span style={{marginLeft:'0px',width:'10%'}}>{(element.position==(index+1).toString() && (index+1==1 || index+1==2 || index+1==3  ))?<img  style={{width:'1.4vw',height:'2.7vh'}} src={require(`./Assets/${index+1}medal.png`)}/>:<p>{element.position}</p>}
      </span> 
                  <span style={{marginLeft:'10px',width:'30%'}}>{element.Driver.givenName} {element.Driver.familyName}</span>
                  <span style={{marginRight:'50px',color:'#ffd700',width:'20%'}}>{(element.Time)?<p>{element.Time.time}{index==0?<p>min</p>:<p>sec</p>}</p>:<p>No time</p>}</span>
                  <span style={{marginRight:'auto',color:'#ffd700',width:'40%'}}>Laps : {element.laps}</span> <span style={{marginRight:'10px',color:'#ffd700'}}> Started at:  {element.grid}</span>
                </li>
              );
            })
          ) : (
            <p style={{marginTop:'4vh',width:'auto',fontFamily:'Russo One',color:'#ffd700',fontSize:'1.2rem',backgroundColor:'#A50021',padding:'1vh',borderRadius:'5px'}}>Race data only available from 2003</p>
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
          <p  style={{fontFamily:'Russo One',color:'#ffd700',fontSize:'1.2rem',backgroundColor:'#A50021',padding:'1vh',borderRadius:'5px'}}>Starting Grid {submitYear}</p>

          <img
             style={{ cursor: "pointer",width:'1.5vw',height:'3vh'}}
            src={require('./Assets/expand.png')}
            onClick={() => {
              document.getElementById("startingGrid").style.display = "";
            }}
          />
           <img
             style={{ cursor: "pointer",width:'1.5vw',height:'3vh'}}
            src={require('./Assets/minimise.png')}
            onClick={() => {
              document.getElementById("startingGrid").style.display = "none";
            }}
          />
        </span>
        <ul id="startingGrid" style={{display:raceToggle}}>
         {startingGrid?startingGrid.map((element,index)=>{
           return (
             <li  id={index.toString()} onMouseOver={()=>{
               document.getElementById(index.toString()).innerText=`${element.name}`;
               document.getElementById(index.toString()).style.fontSize='0.5rem';

             }}
             onMouseOut={()=>{
              document.getElementById(index.toString()).innerText=`${element.code}`;
              document.getElementById(index.toString()).style.fontSize='1rem';
            }}
             style={{marginLeft:(index%2==0)?'0px':'60px'}} className='startingGridItem'>{element.code?<p>{element.code}</p>:<p>-----</p>}</li>
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
          top: "0%",
          left: "4%",
          width: "20px",
          height: "20px",
          zIndex: 1000000 ,
        }}
      >
        <p>
          <a style={{ backgroundColor:'#A50021',padding:'0.8vh',fontFamily:'Russo One',textDecoration:'none',color: "#edcb53", fontSize: "2rem",borderRadius:'1vh'}} href="/">
            Home
          </a>
        </p>
      </div>

      <div
      id="satellite"
        style={{
          position: "absolute",
          top: "30%",
          right: "0%",
          width: "auto",
          height: "auto",
          zIndex: 1000,
          cursor:'pointer',
          padding:'1vw',
          backgroundColor:'#ffd700',
          borderRadius:'1vw',
          transform:'scale(0.7)'
        }}
      >
        <p>
          <a style={{ color: "black", fontSize: "1.5rem" }} onClick={()=>{
             document.getElementById('satellite').style.backgroundColor='#ffd700'; 
             document.getElementById('street').style.backgroundColor='#black';   
            setMapView("https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=hs3S6M6cLXWe5u0OssHP");
          }}>
           <img  style={{height:'6vh',width:'3vw'}}src={require('./Assets/satellite.png')}/>
          </a>
        </p>
      </div>

      <div
      id="street"
        style={{
          position: "absolute",
          top: "20%",
          right: "0%",
          width: "auto",
          height: "auto",
          zIndex: 1000,
          cursor:'pointer',
          padding:'1vw',
          backgroundColor:'black',
          borderRadius:'1vw',
          transform:'scale(0.7)'
        }}
      >
        <p>
          <a style={{ color: "black",fontSize: "1.5rem" }} onClick={()=>{
            document.getElementById('street').style.backgroundColor='#ffd700';  
            document.getElementById('satellite').style.backgroundColor='black';  
            setMapView("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=hs3S6M6cLXWe5u0OssHP");
          }}>
           <img  style={{height:'6vh',width:'3vw'}}src={require('./Assets/street.png')}/>
          </a>
        </p>
      </div>


      <div id="gridContainer">
      <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2vh",
            overflow:'hidden',
          }}
        >
          <p style={{fontFamily:'Russo One',color: "white", textAlign: "center", fontSize: "2rem",marginTop:'1vh'}}>
          F1 Tracks {submitYear}
         </p>
          <div style={{ display: "flex" ,justifyContent:'center',alignItems:'center', gap: "1rem",width:'24vw',height:'15vh' }}>
            <input
              id="year"
              type="text"
              style={{
                width:'12vw',
                height:'5vh',
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
              placeholder={`${submitYear} (between  1950 to 2021)`}
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
                border: "solid 2px white",
                backgroundColor: "white",
                backdropFilter: "blur(10px)",
                fontFamily:'Russo One',
              }}
              onClick={handleSubmitYear}
            />
          </div>
        </div>
      <div id="trackGrid">
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
                      track.circuitId,
                      track.Location.locality
                    )
                  }
                  className="trackListItem"
                >
                  <span>{track.circuitName}</span>
                  <span style={{color:'black'}}>{track.Location.locality}</span>
                  <span style={{color:'black'}}>{track.Location.country}</span>
                </li>
              );
            })
          ) : (
            <div className="spinner"></div>
          )}
        </ul>
      </div>
      </div>
      <div id="map">
      <div
        style={{
          position: "absolute",
          top: "2%",
          right: "6%",
          width: "20px",
          height: "20px",
          zIndex: 10000 ,
        }}
      >
        <p>
          <a onClick={()=>handleOpen()} style={{ backgroundColor:'#A50021',padding:'0.8vh',fontFamily:'Russo One',textDecoration:'none',color: "#edcb53", fontSize: "2rem",borderRadius:'1vh'}} href="#">
            Tracks
          </a>
        </p>
      </div>
        <DisplayMap />
      </div>
      
    </>
  );
};

export default TrackLocator;
