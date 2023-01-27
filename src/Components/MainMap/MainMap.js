import React from "react";
import {
  MapContainer,
  GeoJSON,
  TileLayer,
  Marker,
  MarkerProps,
  Popup,
} from "react-leaflet";
import POIPopUp from "../POIPopUp/POIPopUp";
import "leaflet/dist/leaflet.css";
import "./MainMap.css";

const MainMap = (props) => {
  const { pointsOfInterest } = props;

  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw" }}
      zoom={7}
      center={[33.66155, -78.9379]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pointsOfInterest.features.map((poi, idx) => {
        const lat = poi.geometry.coordinates[1];
        const lon = poi.geometry.coordinates[0];
        return (
          <Marker key={idx} position={[lat, lon]}>
            <POIPopUp position={[lat, lon]} poi={poi}></POIPopUp>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MainMap;
