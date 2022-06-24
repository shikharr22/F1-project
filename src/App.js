import React, { useState } from "react";
import "./App.css";
import {Route,BrowserRouter as Router, Switch, Routes} from 'react-router-dom';
import TrackLocator from "./TrackLocator";
import Home from "./Home.js";


const App = () => {
  console.log("App Render");

  return (
    <>

    <Router>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/TrackLocator'  element={<TrackLocator/>}/>
      </Routes>
      </Router>
    </>
  );
};

export default App;
