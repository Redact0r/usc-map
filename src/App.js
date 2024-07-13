/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import MainMap from "./Components/MainMap/MainMap";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import "./App.css";
import UserContextProvider from "./contexts/UserContext/UserContext";

const envVariables = process.env;

mapboxgl.accessToken = envVariables.REACT_APP_MAPBOX_TOKEN;

function App() {
  const [pointsOfInterest, setPointsofInterest] = useState({ features: [] });
  const getData = async () => {
    const res = await fetch(
      `${process.env.PUBLIC_URL}/assets/data/locationManifest.json`
    );
    if (!res.ok) {
      throw new Error("Map data failed to load");
    }

    return res.json();
  };
  useEffect(() => {
    // Fetching Data on Initial Load
    getData().then((data) => {
      return setPointsofInterest(data);
    });
  }, []);

  return (
    <UserContextProvider>
      <MainMap pointsOfInterest={pointsOfInterest}></MainMap>
    </UserContextProvider>
  );
}

export default App;
