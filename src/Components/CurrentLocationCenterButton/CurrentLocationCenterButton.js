import React, { useContext } from "react";
import { useMap } from "react-leaflet";
import { UserContext } from "../../contexts/UserContext/UserContext";
import "./CurrentLocationCenterButton.css";

const CurrentLocationCenterButton = (props) => {
  const map = useMap();
  const { position } = useContext(UserContext);

  const handleCenterClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    map.flyTo(position, map.getZoom());
  };

  return (
    <button
      className="currentLocationCenterButton"
      onClick={(e) => handleCenterClick(e)}
      disabled={position === null}
    ></button>
  );
};

export default CurrentLocationCenterButton;
