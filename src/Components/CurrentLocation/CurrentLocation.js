import { useState } from "react";
import { useMapEvents } from "react-leaflet";

const CurrentLocation = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      console.log(e);
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setPosition([lat, lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position;
};

export default CurrentLocation;
