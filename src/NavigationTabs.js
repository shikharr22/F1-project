import React, { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";


const handleDriverMouseOver=()=>{
  console.log("Driver Standings")
}

const NavigationTabs = () => {
  return (
    <>
      <div id="navigationTabs">
        <Card  sx={{backgroundColor:"transparent",margin:20,minWidth:200}}>
          <CardContent>
            <a  onMouseOver={handleDriverMouseOver} href="#standings" style={{ backgroundColor: "transparent" }}>
              <CardMedia
                component="img"
                height="1"
                src={require("./Assets/driversStandings2.png")}
                alt="Drivers standings"
              />
            </a>
          </CardContent>
        </Card>
        <Card  sx={{backgroundColor:"transparent",margin:20,minWidth:100}}>
          <CardContent>
          <a href="#standings" style={{ backgroundColor: "transparent" }}>
          <CardMedia
                component="img"
                height="1"
                src={require("./Assets/ConstructorsStandings2.png")}
                alt="Constructors standings"
              />
              </a>
          </CardContent>
        </Card>
        <Card  sx={{backgroundColor:"transparent",margin:20,minWidth:100}}>
          <CardContent>
          <a href="/TrackLocator" target="_blank" style={{ backgroundColor: "transparent" }}>
          <CardMedia
                component="img"
                height="1"
                src={require("./Assets/trackLocator2.png")}
                alt="Track Locator"
              />
              </a>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NavigationTabs;
