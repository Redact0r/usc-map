/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locationData } from "../../assets/data/locationManifest.js";
import locData2 from "../../assets/data/locationManifest.geojson";
import { GeoJSON } from "leaflet";
// import GeoJSONUpdates from "../GeoJSONUpdates/GeoJSONUpdates";

const envVariables = process.env;

mapboxgl.accessToken = envVariables.REACT_APP_MAPBOX_TOKEN;

function App() {
  // const parsedData = JSON.parse(locData2);

  // console.log(parsedData);

  const firstLngLat = locationData.features[0].geometry.coordinates;
  const [lng, setLng] = useState(firstLngLat[0]);
  const [lat, setLat] = useState(firstLngLat[1]);
  const [zoom, setZoom] = useState(9);

  const locations = locationData.features;

  return (
    <MapContainer center={[lng, lat]} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, idx) => {
        if (
          location.geometry.coordinates.length < 1 ||
          !location.geometry.coordinates
        )
          if (location.geometry.coordinates.length > 0)
            return (
              <Marker
                key={idx}
                position={GeoJSON.coordsToLatLng(location.geometry.coordinates)}
              >
                <Popup>
                  {`${location.properties.Name}`}
                  <br />
                  {`${location.properties.Description_full}`}
                </Popup>
              </Marker>
            );
      })}
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </MapContainer>
  );
}

export default App;
