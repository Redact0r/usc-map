import React, { useRef, useEffect, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locationData } from "../assets/data/locationManifest.js";
import { geoJson } from "leaflet";
// import GeoJSONUpdates from "../GeoJSONUpdates/GeoJSONUpdates";

const envVariables = process.env;

mapboxgl.accessToken = envVariables.REACT_APP_MAPBOX_TOKEN;

function App() {
  const firstLngLat = locationData.features[0].geometry.coordinates;
  const [lng, setLng] = useState(firstLngLat[0]);
  const [lat, setLat] = useState(firstLngLat[1]);
  const [zoom, setZoom] = useState(9);

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  // });

  // useEffect(() => {
  //   map.current.on("load", () => {
  //     mapboxgl.addSource("locations", {
  //       type: "geojson",
  //       data: "../assets/data/locationManifest.geojson",
  //     });
  //   });
  // });
  // const handleMove = () => {
  //   setLng(map.getCenter().lng.toFixed(4));
  //   setLat(map.getCenter().lat.toFixed(4));
  // };

  // const handleZoom = () => {
  //   console.log("fire");
  //   setZoom(map.current.getZoom().toFixed(2));
  // };
  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.on("move", () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  const locations = locationData.features;
  return (
    <MapContainer center={[lng, lat]} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, idx) => (
        <Marker key={idx} position={location.geometry.coordinates}>
          <Popup>
            {`${location.properties.title}`}
            <br />
            {`${location.properties.description}`}
          </Popup>
        </Marker>
      ))}
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </MapContainer>
  );
}

export default App;
