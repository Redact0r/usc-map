/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
// import * as ReactDOM from "react-dom/client";
import MainMap from "./Components/MainMap/MainMap";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import "./App.css";
// import pointsOfInterest from "./assets/data/locationManifest.json";
import UserContextProvider from "./contexts/UserContext/UserContext";

const envVariables = process.env;

mapboxgl.accessToken = envVariables.REACT_APP_MAPBOX_TOKEN;

// const xhttp = new XMLHttpRequest();
// let data = {};
// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     // Typical action to be performed when the document is ready:
//     // console.log(xhttp.responseText);
//     data = JSON.parse(xhttp.responseText);
//     // ReactDOM.createRoot(
//     //   <MainMap pointsOfInterest={JSON.stringify(data).features} />,
//     //   document.getElementById("root")
//     // );
//   }
// };

// xhttp.open(
//   "GET",
//   `${process.env.PUBLIC_URL}/assets/data/locationManifest.json`,
//   true
// );
// xhttp.send();

// const pois = data;
// console.log(pois);

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
  console.log("rendered map", pointsOfInterest);
  useEffect(() => {
    // Fetching Data on Initial Load
    getData().then((data) => {
      console.log("Fetched map", data);
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
