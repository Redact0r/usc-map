import React, { useContext } from "react";
import { LayersControl, FeatureGroup, Marker, useMap } from "react-leaflet";
import POIPopUp from "../POIPopUp/POIPopUp";
import { UserContext } from "../../contexts/UserContext/UserContext";

import { getMilesFromMeters } from "../../helpers/Util";

const LayersControlGroup = (props) => {
  const { position } = useContext(UserContext);
  const { pointsOfInterest } = props;
  const map = useMap();

  const filterByDistance = (startingPos, endingPos) => {
    if (!endingPos) return;

    const distanceInMeters = map.distance(startingPos, endingPos);

    const distanceInMiles = getMilesFromMeters(distanceInMeters);

    return distanceInMiles;
  };

  if (position) {
    console.log(filterByDistance(position, [25, -125]));
  }

  return (
    <LayersControl>
      <LayersControl.Overlay name="Marker Overlay">
        <FeatureGroup>
          {pointsOfInterest.features.map((poi, idx) => {
            const lat = poi.geometry.coordinates[1];
            const lon = poi.geometry.coordinates[0];
            return (
              <Marker key={idx} position={[lat, lon]}>
                <POIPopUp position={[lat, lon]} poi={poi}></POIPopUp>
              </Marker>
            );
          })}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Sites within 1 mi">
        <FeatureGroup></FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Sites within 5 mi">
        <FeatureGroup></FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Sites within 10 mi">
        <FeatureGroup></FeatureGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default LayersControlGroup;
