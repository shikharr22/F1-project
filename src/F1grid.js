import React, { useState } from "react";
import { Grid } from "@mui/material";
import Team from "./Team";

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
      name:"Mercedez",
      logo:"https://www.formula1.com/content/dam/fom-website/teams/2022/mercedes-logo.png.transform/2col-retina/image.png",
      handle:handleMercedez,
    }
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
              paddingTop: "1rem",
              backgroundColor:"white",
              height: "100vh",
              width: "100vw",
            }}
          >
            <Grid container direction="column" spacing={2}>
              {teams_array.map((team) => {
                return (
                  <Grid item xs={4}>
                    <div
                      onClick={team.handle}
                      style={{
                        height: "10vh",
                        width: "100vw",
                        paddingLeft: "2rem",
                        cursor: "pointer",
                      }}
                    >
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={1}>
                          <img
                            style={{ width: "6rem", height: "4rem",transform:"scale(0.8)"}}
                            src={team.logo}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <p
                            style={{
                              fontFamily: "Russo one",
                              fontSize: "2rem",
                              color: "black",
                            }}
                          >
                            {team.name}
                          </p>
                        </Grid>
                      </Grid>
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
