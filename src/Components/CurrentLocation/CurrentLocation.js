import { useState, useEffect } from "react";
import { useMap, useMapEvents, CircleMarker, Popup } from "react-leaflet";

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
    <CircleMarker center={position}>
      <Popup>
        <p>You are here</p>
      </Popup>
    </CircleMarker>
  );
};

export default CurrentLocation;
