/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React from "react";
import MainMap from "./components/MainMap/MainMap";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import "./App.css";
import pointsOfInterest from "./assets/data/locationManifest.json";
import UserContextProvider from "./contexts/UserContext/UserContext";

const envVariables = process.env;

mapboxgl.accessToken = envVariables.REACT_APP_MAPBOX_TOKEN;

function App() {
  return (
    <UserContextProvider>
      <MainMap pointsOfInterest={pointsOfInterest}></MainMap>
    </UserContextProvider>
  );
}

export default App;
