import { useState, useEffect, useContext } from "react";
import { useMap, useMapEvents, CircleMarker, Popup } from "react-leaflet";
import CurrentLocationCenterButton from "../CurrentLocationCenterButton/CurrentLocationCenterButton";
import { UserContext } from "../../contexts/UserContext/UserContext";

const CurrentLocation = (props) => {
  const { position, handleNewPosition, testMode } = useContext(UserContext);
  const map = useMap();

  useEffect(() => {
    if (testMode) {
      const pos = [33.66578333, -78.94325];
      handleNewPosition(pos);
      map.flyTo(pos, map.getZoom());
    } else {
      map.locate().on("locationfound", (e) => {
        const pos = [e.latlng.lat, e.latlng.lng];
        handleNewPosition(pos);
        map.flyTo(pos, map.getZoom());
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, testMode]);

  return position === null ? null : (
    <div>
      <CircleMarker center={position}>
        <Popup>
          <p>You are here</p>
        </Popup>
      </CircleMarker>
      <CurrentLocationCenterButton
        position={position}
      ></CurrentLocationCenterButton>
    </div>
  );
};

export default CurrentLocation;
