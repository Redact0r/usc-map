import React, { useContext, useState } from "react";
import { MapContainer, TileLayer, ScaleControl } from "react-leaflet";
import LayersControlGroup from "../LayersControlGroup/LayersControlGroup";
// import POIPopUp from "../POIPopUp/POIPopUp";
import "leaflet/dist/leaflet.css";
import "./MainMap.css";
import SidebarContainer from "../SidebarContainer/SidebarContainer";
import CurrentLocation from "../CurrentLocation/CurrentLocation";

import { UserContext } from "../../contexts/UserContext/UserContext";

const MainMap = (props) => {
  const { position } = useContext(UserContext);

  const { pointsOfInterest } = props;

  return (
    <div>
      <SidebarContainer />
      <MapContainer
        className="sidebar-map"
        style={{ height: "100vh", width: "100vw" }}
        zoom={15}
        center={position || [33.66155, -78.9379]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CurrentLocation />
        <LayersControlGroup pointsOfInterest={pointsOfInterest} />
        <ScaleControl />
      </MapContainer>
    </div>
  );
};

export default MainMap;
