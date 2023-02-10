import { useState, useEffect, useContext } from "react";
import { useMap, useMapEvents, CircleMarker, Popup } from "react-leaflet";
import CurrentLocationCenterButton from "../CurrentLocationCenterButton/CurrentLocationCenterButton";
import { UserContext } from "../../contexts/UserContext/UserContext";

import { getMilesFromMeters } from "../../helpers/Util";

const CurrentLocation = (props) => {
  const { position, handleNewPosition, testMode } = useContext(UserContext);
  const map = useMap();

  const filterByDistance = (distance) => {
    const coordA = [33.968123, -118.419454];

    const coordB = [33.997223, -117.929145];

    const distanceCheck = map.distance(coordA, coordB);
    return distanceCheck;
  };

  console.log(getMilesFromMeters("45323.84"));

  console.log(filterByDistance());

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
