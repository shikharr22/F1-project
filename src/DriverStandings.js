import React, { useState, memo, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";
import { Input, Grid, TextField, Button, Stack } from "@mui/material";
import { Paper, styled } from "@mui/material";

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
          spacing={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <TextField
                label=""
                helperText="Submit any year from 1950 to 2022"
                type="number"
                size="small"
                color="secondary"
                onChange={handleInputYear}
              />
              <Button
                color="secondary"
                onClick={handleSubmitYear}
                
                size="small"
              >
               <span style={{fontWeight:"bold",color:"black"}}> Submit Year </span>
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <TextField
                label=""
                helperText="Submit any round from 1 to 22"
                type="number"
                size="small"
                color="secondary"
                onChange={handleInputRound}
              />
              <Button
                onClick={handleSubmitRound}
                
                size="small"
                color="secondary"
              >
                <span style={{fontWeight:"bold",color:"black"}}>Submit Round </span> 
              </Button>
            </Stack>
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
              <p style={{ color: "black", fontSize: "2rem" }}>
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
                            width: "3rem",
                            fontWeight: "bold",
                            color: "black",
                            marginRight: "1rem",
                            backgroundColor: "gold",
                            padding: "0.5rem",
                            textAlign: "center",
                          }}
                        >
                          {driver.position}
                        </span>

                        <span
                          style={{
                            height: "3rem",
                            width: "15rem",
                            fontWeight: "bold",
                            color: "black",
                            marginRight: "1rem",
                            backgroundColor: "gold",
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
                            fontWeight: "bold",
                            fontSize:"1.0rem",
                            color: "black",
                            marginRight: "1rem",
                            backgroundColor: "gold",
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
                            fontWeight: "bold",
                            fontSize:"1.0rem",
                            color: "black",
                            marginRight: "1rem",
                            backgroundColor: "gold",
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
