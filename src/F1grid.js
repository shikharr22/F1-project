import React, { useState } from "react";
import { Grid } from "@mui/material";
import Team from "./Team";
import "./App.css";

const F1grid = () => {
  const [d1_pic, setD1_pic] = useState("");
  const [d1_name, setD1_name] = useState("");
  const [d1_number, setD1_number] = useState("");

  const [d2_pic, setD2_pic] = useState("");
  const [d2_name, setD2_name] = useState("");
  const [d2_number, setD2_number] = useState("");
  const [c, setC] = useState("");

  const handleMclaren = () => {
    document.getElementById("team").style.display = "";
    setD1_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/lando-norris/_jcr_content/image.img.1920.medium.jpg/1646819013197.jpg"
    );
    setD1_name("Lando Norris");
    setD1_number("3");
    setD2_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/daniel-ricciardo/_jcr_content/image.img.1920.medium.jpg/1646818924510.jpg"
    );
    setD2_name("Daniel Riccardo");
    setD2_number("4");
    setC("orange");
  };

  const handleFerrari = () => {
    document.getElementById("team").style.display = "";
    setD1_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/charles-leclerc/_jcr_content/image.img.1920.medium.jpg/1646818893219.jpg"
    );
    setD1_name("Charles Leclerc");
    setD1_number("16");
    setD2_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/carlos-sainz/_jcr_content/image.img.1920.medium.jpg/1646818866749.jpg"
    );
    setD2_name("Carlos Sainz");
    setD2_number("55");
    setC("red");
  };

  const handleMercedez = () => {
    document.getElementById("team").style.display = "";
    setD1_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/george-russell/_jcr_content/image.img.1920.medium.jpg/1646750994602.jpg"
    );
    setD1_name("George Russell");
    setD1_number("63");
    setD2_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/lewis-hamilton/_jcr_content/image.img.1920.medium.jpg/1647334259839.jpg"
    );
    setD2_name("Lewis Hamilton");
    setD2_number("44");
    setC("#00ffff");
  };

  const handleRedbull = () => {
    document.getElementById("team").style.display = "";
    setD1_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/max-verstappen/_jcr_content/image.img.1920.medium.jpg/1646819045507.jpg"
    );
    setD1_name("Max Verstappen");
    setD1_number("33");
    setD2_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/sergio-perez/_jcr_content/image.img.1920.medium.jpg/1646819228700.jpg"
    );
    setD2_name("Sergio Perez");
    setD2_number("11");
    setC("#23326A");
  };

  const handleAstonmartin = () => {
    document.getElementById("team").style.display = "";
    setD1_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/sebastian-vettel/_jcr_content/image.img.1920.medium.jpg/1646818813887.jpg"
    );
    setD1_name("Sebastian vettel");
    setD1_number("5");
    setD2_pic(
      "https://www.formula1.com/content/fom-website/en/drivers/lance-stroll/_jcr_content/image.img.1920.medium.jpg/1648135171947.jpg"
    );
    setD2_name("Lance Stroll");
    setD2_number("22");
    setC("#004225");
  };

  let teams_array = [
    {
      name: "Mclaren",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2022/mclaren-logo.png.transform/2col-retina/image.png",
      handle: handleMclaren,
    },
    {
      name: "Ferrari",
      logo: "https://www.formula1.com/content/fom-website/en/teams/Ferrari/_jcr_content/logo.img.jpg/1521797474166.jpg",
      handle: handleFerrari,
    },
    {
      name: "Mercedez",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2022/mercedes-logo.png.transform/2col-retina/image.png",
      handle: handleMercedez,
    },
    {
      name: "Red Bull",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2022/mercedes-logo.png.transform/2col-retina/image.png",
      handle: handleRedbull,
    },
    {
      name: "Aston Martin",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2022/mercedes-logo.png.transform/2col-retina/image.png",
      handle: handleAstonmartin,
    },
    
  ];

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={9}>
          <div
            style={{
              backgroundColor: "black",
              height: "100vh",
              width: "100vw",
              overflowY:"auto",
            }}
          >
            <div id="team" style={{ display: "none" }}>
              <Team
                driver1_pic={d1_pic}
                driver1_number={d1_number}
                driver1_name={d1_name}
                driver2_name={d2_name}
                driver2_pic={d2_pic}
                driver2_number={d2_number}
                color={c}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
              backgroundImage: "linear-gradient(to right,#000000,#2b0c13,#4f0a18,#720115,#940007)",
              height: "100vh",
              width: "100vw",
            }}
          >
            <Grid container direction="column" spacing={2} justifyContent="center">
              {teams_array.map((team) => {
                return (
                  <Grid item>
                    <div
                      onClick={team.handle}
                      style={{
                        height: "6vh",
                        width: "100vw",
                        margin: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      
                          <p
                            style={{
                              fontFamily: "Russo one",
                              fontSize: "2rem",
                              color: "#ffd700",
                            }}
                          >
                            {team.name}
                          </p>
                       
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default F1grid;
