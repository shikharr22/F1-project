import React from "react";
import { Grid } from "@mui/material";

const Team = (props) => {
  let driver1_pic=props.driver1_pic;
  let driver1_number=props.driver1_number;
  let driver1_name=props.driver1_name;
  let color=props.color;

  let driver2_pic=props.driver2_pic;
  let driver2_number=props.driver2_number;
  let driver2_name=props.driver2_name;

  console.log(driver1_name);
  
  const handleMouseIn1=()=>{
      document.getElementById("driver1").style.transform="scale(0.78)";
      
  }

  const handleMouseOut1=()=>{
    document.getElementById("driver1").style.transform="scale(0.75)";
}

const handleMouseIn2=()=>{
  document.getElementById("driver2").style.transform="scale(0.78)";
  
}

const handleMouseOut2=()=>{
document.getElementById("driver2").style.transform="scale(0.75)";
}

  return (
    <>
      <Grid container xs={8} direction="row" justifyContent="flex-start" >
        
        <Grid item xs={6}>
          <div
          id="driver1"
            onMouseOver={handleMouseIn1}
            onMouseOut={handleMouseOut1}
            style={{
              backgroundColor: "white",
              height: "100vh",
              width: "100vw",
              transform:"scale(0.7)",
              
            }}
          >
            <Grid
              container
              direction="column"
              
            >
              <Grid item>
                <div
                  style={{
                    display: "flex",
                    alignitems: "center",
                    backgroundColor: "white",
                    height: "70vh",
                    width: "100vw",
                    
                  }}
                >
                  <img
                    style={{ width: "40%", height: "100%" }}
                    src={driver1_pic}
                  />
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: `${color}`,
                    height: "30vh",
                    width: "100vw",
                    paddingLeft: "2rem",
                   
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Russo one",
                      fontSize: "4rem",
                      color: "black",
                    }}
                  >
                   {driver1_number}
                  </p>

                  <p
                    style={{
                      fontFamily: "Russo one",
                      fontSize: "2rem",
                      color: "black",
                    }}
                  >
                   {driver1_name}
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
          id="driver2"
          onMouseOver={handleMouseIn2}
          onMouseOut={handleMouseOut2}
            style={{
              backgroundColor: "white",
              height: "100vh",
              width: "100vw",
              transform:"scale(0.7)",
              
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <div
                  style={{
                    display: "flex",
                    alignitems: "center",
                    backgroundColor: "white",
                    height: "70vh",
                    width: "100vw",
                  }}
                >
                  <img
                    style={{ width: "40%", height: "100%" }}
                    src={driver2_pic}
                  />
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: `${color}` ,
                    height: "30vh",
                    width: "100vw",
                    paddingLeft: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Russo one",
                      fontSize: "4rem",
                      color: "black",
                    }}
                  >
                    {driver2_number}
                  </p>
                  <p
                    style={{
                      fontFamily: "Russo one",
                      fontSize: "2rem",
                      color: "black",
                    }}
                  >
                    {driver2_name}
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        
      </Grid>
    </>
  );
};

export default Team;
