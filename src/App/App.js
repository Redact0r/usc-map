import React, { useRef, useEffect, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import locationData from "../assets/data/locationManifest.geojson";

const envVariables = process.env;

mapboxgl.accessToken = envVariables.REACT_APP_MAPBOX_TOKEN;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(33.6615);
  const [lat, setLat] = useState(-78.9379);
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

  const handleMove = () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
  };

  const handleZoom = () => {
    setZoom(map.current.getZoom().toFixed(2));
  };
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <MapContainer
      center={[lng, lat]}
      zoom={zoom}
      scrollWheelZoom={true}
      onZoom={handleZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lng, lat]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </MapContainer>
  );
}

export default App;
