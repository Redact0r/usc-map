import { useState, useEffect } from "react";
import { useMap, useMapEvents, CircleMarker, Popup } from "react-leaflet";
import CurrentLocationCenterButton from "../CurrentLocationCenterButton/CurrentLocationCenterButton";

const CurrentLocation = () => {
  const [position, setPosition] = useState(null);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      const pos = [e.latlng.lat, e.latlng.lng];
      setPosition(pos);
      map.flyTo(pos, map.getZoom());
    });
  }, [map]);

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
