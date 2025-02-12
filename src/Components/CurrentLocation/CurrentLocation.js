import { useEffect, useContext } from "react";
import { useMap, CircleMarker, Popup } from "react-leaflet";
import CurrentLocationCenterButton from "../CurrentLocationCenterButton/CurrentLocationCenterButton";
import { UserContext } from "../../contexts/UserContext/UserContext";

const CurrentLocation = (props) => {
  const { position, setPosition, testMode } = useContext(UserContext);
  const map = useMap();

  useEffect(() => {
    if (testMode) {
      //toggle 2 positions here to test map functionality of re-rendering distance layers in test mode
      // const pos = [33.66578333, -78.94325];
      const pos = [33.68083333, -79.3675];
      setPosition(pos);
      map.flyTo(pos, map.getZoom());
    } else {
      map.locate().on("locationfound", (e) => {
        const pos = [e.latlng.lat, e.latlng.lng];
        setPosition(pos);
        map.flyTo(pos, map.getZoom());
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testMode]);

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
