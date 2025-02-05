import React, { useContext, useEffect, useState } from "react";
import L from "leaflet";
import { LayersControl, FeatureGroup, Marker, useMap } from "react-leaflet";
import POIPopUp from "../POIPopUp/POIPopUp";
import { UserContext } from "../../contexts/UserContext/UserContext";

import { getMilesFromMeters } from "../../helpers/Util";

const LayersControlGroup = (props) => {
  const {
    position,
    layer1POIs,
    handleLayer1Change,
    layer2POIs,
    handleLayer2Change,
    layer3POIs,
    handleLayer3Change,
    layer4POIs,
    handleLayer4Change,
    layer5POIs,
    handleLayer5Change,
  } = useContext(UserContext);

  const icon = L.icon({
    iconUrl: `${process.env.PUBLIC_URL}/assets/leaflet/cssmarker-icon.png`,
    shadowUrl: `${process.env.PUBLIC_URL}/assets/leaflet/cssmarker-shadow.png`,
  });

  const [selectedLayerArray, setSelectedLayerArray] = useState([
    { name: "All Sites", checked: false },
    { name: "Sites within 1 mi", checked: false },
    { name: "Sites within 5 mi", checked: false },
    { name: "Sites within 10 mi", checked: false },
    { name: "Sites within 25 mi", checked: true },
    { name: "Sites within 50 mi", checked: false },
  ]);

  const { pointsOfInterest } = props;
  const map = useMap();

  const filterByDistance = (startingPos, endingPos) => {
    if (!endingPos) return;

    const distanceInMeters = map.distance(startingPos, endingPos);

    const distanceInMiles = getMilesFromMeters(distanceInMeters);

    return distanceInMiles;
  };

  const getLayerPOIs = (radius) => {
    const pois = pointsOfInterest.features.filter((poi) => {
      const lat = poi.geometry.coordinates[1];
      const lng = poi.geometry.coordinates[0];
      const poiLatLng = [lat, lng];
      const distanceCheck = filterByDistance(position, poiLatLng);

      return distanceCheck <= radius;
    });

    return pois;
  };

  useEffect(() => {
    const _layer1POIs = getLayerPOIs(1);
    const _layer2POIs = getLayerPOIs(5);
    const _layer3POIs = getLayerPOIs(10);
    const _layer4POIs = getLayerPOIs(25);
    const _layer5POIs = getLayerPOIs(50);
    handleLayer1Change(_layer1POIs);
    handleLayer2Change(_layer2POIs);
    handleLayer3Change(_layer3POIs);
    handleLayer4Change(_layer4POIs);
    handleLayer5Change(_layer5POIs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  map.on("overlayadd", (e) => {
    const newLayerTitle = e.name.trim();
    const oldStateLayerArray = selectedLayerArray;

    let newStateArray = [];

    for (let i = 0; i < oldStateLayerArray.length; i++) {
      let layer = oldStateLayerArray[i];

      const checked = layer.name === newLayerTitle;

      const newObject = { name: layer.name, checked: checked };

      newStateArray.push(newObject);
    }

    return setSelectedLayerArray(newStateArray);
  });

  return (
    <LayersControl groupCheckboxes={true}>
      <LayersControl.Overlay
        name="All Sites"
        checked={selectedLayerArray[0].checked}
      >
        <FeatureGroup>
          {pointsOfInterest.features.map((poi, idx) => {
            const lat = poi.geometry.coordinates[1];
            const lng = poi.geometry.coordinates[0];
            return (
              <Marker key={idx} position={[lat, lng]} icon={icon}>
                <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
              </Marker>
            );
          })}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay
        name="Sites within 1 mi"
        checked={selectedLayerArray[1].checked}
      >
        <FeatureGroup>
          {layer1POIs.length > 0
            ? layer1POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]} icon={icon}>
                    <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
                  </Marker>
                );
              })
            : null}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay
        name="Sites within 5 mi"
        checked={selectedLayerArray[2].checked}
      >
        <FeatureGroup>
          {layer2POIs.length > 0
            ? layer2POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]} icon={icon}>
                    <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
                  </Marker>
                );
              })
            : null}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay
        name="Sites within 10 mi"
        checked={selectedLayerArray[3].checked}
      >
        <FeatureGroup>
          {layer3POIs.length > 0
            ? layer3POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]} icon={icon}>
                    <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
                  </Marker>
                );
              })
            : null}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay
        name="Sites within 25 mi"
        checked={selectedLayerArray[4].checked}
      >
        <FeatureGroup>
          {layer4POIs.length > 0
            ? layer4POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]} icon={icon}>
                    <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
                  </Marker>
                );
              })
            : null}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay
        name="Sites within 50 mi"
        checked={selectedLayerArray[5].checked}
      >
        <FeatureGroup>
          {layer5POIs.length > 0
            ? layer5POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]} icon={icon}>
                    <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
                  </Marker>
                );
              })
            : null}
        </FeatureGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default LayersControlGroup;
