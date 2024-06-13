import React, { useContext, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import LayersControlGroup from "../LayersControlGroup/LayersControlGroup";
import "leaflet/dist/leaflet.css";
import "./MainMap.css";
import Sidebar from "../Sidebar/Sidebar";
import CurrentLocation from "../CurrentLocation/CurrentLocation";

import { UserContext } from "../../contexts/UserContext/UserContext";

const MainMap = (props) => {
  debugger;
  console.log(props);
  const { position } = useContext(UserContext);

  const { pointsOfInterest } = props;

  return (
    <div>
      <MapContainer
        style={{ height: "100vh", width: "100vw" }}
        zoom={15}
        zoomControl={false}
        center={position || [33.66155, -78.9379]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Sidebar pointsOfInterest={pointsOfInterest} />
        <CurrentLocation />
        <LayersControlGroup pointsOfInterest={pointsOfInterest} />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default MainMap;
