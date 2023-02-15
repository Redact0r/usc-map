import React, { useState, useEffect, useContext } from "react";
import {
  MapContainer,
  GeoJSON,
  TileLayer,
  // Marker,
  MarkerProps,
  Popup,
  ScaleControl,
  // LayersControl,
  // FeatureGroup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import LayersControlGroup from "../LayersControlGroup/LayersControlGroup";
// import POIPopUp from "../POIPopUp/POIPopUp";
import "leaflet/dist/leaflet.css";
import "./MainMap.css";
import Sidebar from "../Sidebar/Sidebar";
import CurrentLocation from "../CurrentLocation/CurrentLocation";

import { UserContext } from "../../contexts/UserContext/UserContext";

const MainMap = (props) => {
  const { position } = useContext(UserContext);
  const [centerOfMap, setCenterOfMap] = useState(position);

  const { pointsOfInterest } = props;

  return (
    <div>
      <MapContainer
        style={{ height: "100vh", width: "100vw" }}
        zoom={15}
        center={centerOfMap || [33.66155, -78.9379]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CurrentLocation />
        <LayersControlGroup pointsOfInterest={pointsOfInterest} />
        <ScaleControl />
        <Sidebar />
      </MapContainer>
    </div>
  );
};

export default MainMap;
