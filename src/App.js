/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
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
  const [pois, setPois] = useState();
  const getData = async () => {
    let result = fetch(
      `${process.env.PUBLIC_URL}/assets/data/locationManifest.json`
    )
      .then((res) => (res.ok ? res.json() : Error("Map Data not loaded")))
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => console.error(err));
    setPois(result);
  };
  useEffect(() => {
    // Fetching Data on Initial Load
    getData();
  }, []);

  return (
    <UserContextProvider>
      <MainMap pointsOfInterest={pois}></MainMap>
    </UserContextProvider>
  );
}

export default App;
