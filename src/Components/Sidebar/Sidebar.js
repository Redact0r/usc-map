import React, { Fragment } from "react";
import { useMap, Marker } from "react-leaflet";
import { FiHome } from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <div className="map-sidebar">
      <FiHome></FiHome>
    </div>
  );
};

export default Sidebar;
