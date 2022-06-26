import React, { useState, memo, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";
import { Grid, TextField, Button, Stack } from "@mui/material";



const DriverStandings = () => {
  const [dStandings, setDStandings] = useState([]);
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
    //console.log(totalRounds);
  }, [submitYear]);

  useEffect(() => {
    getDataRound();
  }, [submitRound]);

  useEffect(() => {
    getDataYear();
  }, []);

  const getDataYear = () => {
    let url = `//ergast.com/api/f1/${submitYear}/driverStandings.json`;
    axios(url)
      .then((response) => {
        if (response.data.MRData) {
          setDStandings(
            response.data.MRData.StandingsTable.StandingsLists[0]
              .DriverStandings
          );
          setTotalRounds(
            response.data.MRData.StandingsTable.StandingsLists[0].round
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataRound = () => {
    let url = `//ergast.com/api/f1/${submitYear}/${submitRound}/driverStandings.json`;
    axios(url)
      .then((response) => {
        if (response.data.MRData) {
          setDStandings(
            response.data.MRData.StandingsTable.StandingsLists[0]
              .DriverStandings
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {dStandings[0] ? (
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Grid container spacing={2}  direction="row" justifyContent="flex-start" alignItems="center">
              <Grid item spacing={3}>
              <TextField
                label=""
                helperText="Submit any year from 1950 to 2022"
                
                size="small"
                color="secondary"
                variant="standard"
                sx={{input:{fontFamily:2,color:"white",fontFamily:'Russo One'}}}
                onChange={handleInputYear}
              />
              <Button
                color="secondary"
                onClick={handleSubmitYear}
                
                size="small"
              >

               <span style={{fontFamily:"Russo One",fontWeight:"bold",color:"white"}}> Submit Year </span>
              </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <Grid container spacing={2}  direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item >
              <TextField
                label=""
                helperText="Submit any round from 1 to 22"
                
                size="small"
                color="secondary"
                variant="standard"
                sx={{input:{fontFamily:2,color:"white",fontFamily:'Russo One'}}}
                onChange={handleInputRound}
              />
              <Button
                onClick={handleSubmitRound}
                size="small"
                color="secondary"
              >
                <span style={{fontFamily:"Russo One",fontWeight:"bold",color:"white"}}>Submit Round </span> 
              </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={require("./Assets/f1Logo.png")}
                style={{
                  backgroundColor: "transparent",
                  height: "50px",
                  width: "50px",
                }}
              />
              <p style={{ fontFamily:"Russo One",color: "#ffd700", fontSize: "1.5rem" }}>
                Drivers Standings {submitYear}
              </p>
            </Stack>
          </Grid>
          <div style={{fontSize:"1.5rem",height:"70vh",overflowY:"auto",marginBottom:"2rem",overflowX:"hidden"}}>
          <Grid item xs={12}>
            <Grid container direction="column" spacing={2}>
              {submitYear >= 1950 && submitYear <= 2022 ? (
                dStandings.map((driver, index) => {
                  return (
                    <Grid item xs={6} spacing={2}>
                      <span
                        style={{
                          display: "flex",
                          direction: "row",
                          alignItems: "space-between",
                        }}
                      >
                        <span
                          style={{
                            height: "3rem",
                            width: "4rem",
                            fontSize:"1.5rem",
                            fontFamily:"Russo One",
                            color: "#ffd700",
                            margin: "0 1rem 0 1rem",
                            backgroundColor: "black",
                            padding: "0.5rem",
                            textAlign: "center",
                          }}
                        >
                          {driver.position}
                        </span>

                        <span
                          style={{
                            height: "3rem",
                            width: "20rem",
                            fontSize:"1.2rem",
                            color: "white",
                            fontFamily:"Russo One",
                            marginRight: "1rem",
                            backgroundColor: "black",
                            padding: "0.5rem",
                            textAlign: "left",
                          }}
                        >
                          {driver.Driver.givenName} {driver.Driver.familyName}
                        </span>

                        <span
                          style={{
                            height: "3rem",
                            width: "6rem",
                            fontSize:"1.5rem",
                            fontSize:"1.0rem",
                            color: "white",
                            marginRight: "1rem",
                            fontFamily:"Russo One",
                            backgroundColor: "black",
                            padding: "0.5rem",
                            textAlign: "left",
                          }}
                        >
                          {driver.points} 
                        </span>
                        <span
                          style={{
                            height: "3rem",
                            width: "4rem",
                            fontSize:"1.5rem",
                            fontSize:"1.0rem",
                            fontFamily:"Russo One",
                            color: "white",
                            marginRight: "1rem",
                            backgroundColor: "black",
                            padding: "0.5rem",
                            textAlign: "center",
                          }}
                        >pts</span>
                      </span>
                    </Grid>
                  );
                })
              ) : (
                <p className="driverStandingsItems">
                  Data only available from 1950 to 2021
                </p>
              )}
            </Grid>
          </Grid>
          </div>
        </Grid>
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

export default DriverStandings;

