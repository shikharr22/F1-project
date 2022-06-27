import React, { useState, memo, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";
import { Grid, TextField, Button, Stack } from "@mui/material";

const ConstructorsStandings = () => {
  const [cStandings, setCStandings] = useState([]);
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
  }, [submitYear]);

  useEffect(() => {
    getDataRound();
  }, [submitRound]);

  useEffect(() => {
    getDataYear();
  }, []);

  const getDataYear = () => {
    const url = `//ergast.com/api/f1/${submitYear}/constructorStandings.json`;
    axios(url)
      .then((response) => {
        if (response.data.MRData) {
          setCStandings(
            response.data.MRData.StandingsTable.StandingsLists[0]
              .ConstructorStandings
          );
          setTotalRounds(
            response.data.MRData.StandingsTable.StandingsLists[0].round
          );
          // console.log(
          //   response.data.MRData.StandingsTable.StandingsLists[0]
          //  );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataRound = () => {
    const url = `//ergast.com/api/f1/${submitYear}/${submitRound}/constructorStandings.json`;
    axios(url)
      .then((response) => {
        if (response.data.MRData) {
          setCStandings(
            response.data.MRData.StandingsTable.StandingsLists[0]
              .ConstructorStandings
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {cStandings[0] ? (
        <div
          style={{
            display: "flex",
            direction: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
           <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "30vw",
            }}
          >
            <Grid container direction="column" spacing={2}>
              
              <Grid item>
              <Stack direction="row" spacing={2}>
                <TextField
                  placeholder="1950 onwards"
                  size="small  "
                  color="secondary"
                  variant="filled"
                  sx={{
                    input: {
                      fontFamily: 2,
                      color: "white",
                      fontFamily: "Russo One",
                    },
                  }}
                  onChange={handleInputYear}
                />
                <Button
                  color="secondary"
                  onClick={handleSubmitYear}
                  size="small"
                >
                  <span
                    style={{
                      fontFamily: "Russo One",
                      fontWeight: "bold",
                      color: "white",
                      fontSize:"1rem",
                    }}
                  >
                    {" "}
                    Submit Year{" "}
                  </span>
                </Button>
                </Stack>
              </Grid>

              <Grid item>
                <Stack direction="row" spacing={2}>
                <TextField
                  placeholder="from 1 to 22"
                  size="small"
                  color="secondary"
                  variant="filled"
                  sx={{
                    input: {
                      fontFamily: 2,
                      color: "white",
                      fontFamily: "Russo One",
                    },
                  }}
                  onChange={handleInputRound}
                />
                <Button
                  onClick={handleSubmitRound}
                  size="small"
                  color="secondary"
                >
                  <span
                    style={{
                      fontFamily: "Russo One",
                      fontWeight: "bold",
                      color: "white",
                      fontSize:"1rem",
                    }}
                  >
                    Submit Round{" "}
                  </span>
                </Button>
                </Stack>
              </Grid>
            </Grid>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "70vw",
            }}
          >
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
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
                  <p
                    style={{
                      fontFamily: "Russo One",
                      color: "#ffd700",
                      fontSize: "1.5rem",
                    }}
                  >
                    Constructors Standings {submitYear}
                  </p>
                </Stack>
              </Grid>

              <div
                style={{
                  fontSize: "1.5rem",
                  height: "70vh",
                  overflowY: "auto",
                  marginBottom: "2rem",
                  overflowX: "hidden",
                }}
              >
                <Grid item xs={12}>
                  <Grid container direction="column" spacing={2}>
                    {submitYear >= 1958 && submitYear <= 2022 ? (
                      cStandings.map((constructor, index) => {
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
                                  fontSize: "1.5rem",
                                  fontFamily: "Russo One",
                                  color: "#ffd700",
                                  margin: "0 1rem 0 1rem",
                                  backgroundColor: "black",
                                  padding: "0.5rem",
                                  textAlign: "center",
                                }}
                              >
                                {constructor.position}
                              </span>
                              <span
                                style={{
                                  height: "3rem",
                                  width: "20rem",
                                  fontSize: "1.2rem",
                                  color: "white",
                                  fontFamily: "Russo One",
                                  marginRight: "1rem",
                                  backgroundColor: "black",
                                  padding: "0.5rem",
                                  textAlign: "left",
                                }}
                              >
                                {constructor.Constructor.name}
                              </span>
                              <span
                                style={{
                                  height: "3rem",
                                  width: "6rem",
                                  fontSize: "1.5rem",
                                  fontSize: "1.0rem",
                                  color: "black",
                                  marginRight: "1rem",
                                  fontFamily: "Russo One",
                                  backgroundColor: "#ffd700",
                                  padding: "0.5rem",
                                  textAlign: "left",
                                }}
                              >
                                {constructor.points}
                              </span>
                              <span
                                style={{
                                  height: "3rem",
                                  width: "4rem",
                                  fontSize: "1.5rem",
                                  fontSize: "1.0rem",
                                  fontFamily: "Russo One",
                                  color: "white",
                                  marginRight: "1rem",
                                  backgroundColor: "black",
                                  padding: "0.5rem",
                                  textAlign: "center",
                                }}
                              >
                                pts
                              </span>
                            </span>
                          </Grid>
                        );
                      })
                    ) : (
                      <p className="driverStandingsItems">
                        Data only available from 1958 to 2021
                      </p>
                    )}
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </div>
         
        </div>
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

export default ConstructorsStandings;
