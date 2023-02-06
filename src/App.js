/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, useState } from "react";
import MainMap from "./components/MainMap/MainMap";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import "./App.css";
import pointsOfInterest from "./assets/data/locationManifest.json";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locationData } from "./assets/data/locationManifest.js";
import locData2 from "./assets/data/locationManifest.geojson";
import { GeoJSON } from "leaflet";
// import GeoJSONUpdates from "../GeoJSONUpdates/GeoJSONUpdates";

const envVariables = process.env;

mapboxgl.accessToken = envVariables.REACT_APP_MAPBOX_TOKEN;

function App() {
  return (
    <MainMap pointsOfInterest={pointsOfInterest} mapboxgl={mapboxgl}></MainMap>
  );
}

export default App;
