import React, { useState } from "react";
import { useMap } from "react-leaflet";
import "./CurrentLocationCenterButton.css";

const CurrentLocationCenterButton = (props) => {
  const map = useMap();
  const position = props.position;

  const handleCenterClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    map.flyTo(position, map.getZoom());
    console.log(position);
  };

  return (
    <button
      className="currentLocationCenterButton"
      onClick={(e) => handleCenterClick(e)}
      disabled={position === null}
    >
      <img
        src="./assets/currentlocationmarker.png"
        alt="Center To Your Location"
        className="currentLocationCenterButtonIcon"
      />
    </button>
  );
};

export default CurrentLocationCenterButton;
