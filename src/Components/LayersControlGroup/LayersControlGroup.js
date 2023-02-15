import React, { useContext, useEffect, useMemo } from "react";
import { LayersControl, FeatureGroup, Marker, useMap } from "react-leaflet";
import POIPopUp from "../POIPopUp/POIPopUp";
import { UserContext } from "../../contexts/UserContext/UserContext";

import { getMilesFromMeters } from "../../helpers/Util";

const LayersControlGroup = (props) => {
  const {
    testMode,
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

  const { pointsOfInterest } = props;
  const map = useMap();

  const filterByDistance = (startingPos, endingPos) => {
    if (!endingPos) return;

    const distanceInMeters = map.distance(startingPos, endingPos);

    const distanceInMiles = getMilesFromMeters(distanceInMeters);

    return distanceInMiles;
  };

  useMemo(() => {
    if (position) {
      const _layer1POIs = pointsOfInterest.features.filter((poi) => {
        const lat = poi.geometry.coordinates[1];
        const lng = poi.geometry.coordinates[0];
        const poiLatLng = [lat, lng];
        const distanceCheck = filterByDistance(position, poiLatLng);

        return distanceCheck <= 1;
      });
      const _layer2POIs = pointsOfInterest.features.filter((poi) => {
        const lat = poi.geometry.coordinates[1];
        const lng = poi.geometry.coordinates[0];
        const poiLatLng = [lat, lng];
        const distanceCheck = filterByDistance(position, poiLatLng);

        return distanceCheck <= 5;
      });
      const _layer3POIs = pointsOfInterest.features.filter((poi) => {
        const lat = poi.geometry.coordinates[1];
        const lng = poi.geometry.coordinates[0];
        const poiLatLng = [lat, lng];
        const distanceCheck = filterByDistance(position, poiLatLng);

        return distanceCheck <= 10;
      });
      const _layer4POIs = pointsOfInterest.features.filter((poi) => {
        const lat = poi.geometry.coordinates[1];
        const lng = poi.geometry.coordinates[0];
        const poiLatLng = [lat, lng];
        const distanceCheck = filterByDistance(position, poiLatLng);

        return distanceCheck <= 25;
      });
      const _layer5POIs = pointsOfInterest.features.filter((poi) => {
        const lat = poi.geometry.coordinates[1];
        const lng = poi.geometry.coordinates[0];
        const poiLatLng = [lat, lng];
        const distanceCheck = filterByDistance(position, poiLatLng);

        return distanceCheck <= 50;
      });
      handleLayer1Change(_layer1POIs);
      handleLayer2Change(_layer2POIs);
      handleLayer3Change(_layer3POIs);
      handleLayer4Change(_layer4POIs);
      handleLayer5Change(_layer5POIs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return (
    <LayersControl>
      <LayersControl.Overlay name="All Sites">
        <FeatureGroup>
          {pointsOfInterest.features.map((poi, idx) => {
            const lat = poi.geometry.coordinates[1];
            const lng = poi.geometry.coordinates[0];
            return (
              <Marker key={idx} position={[lat, lng]}>
                <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
              </Marker>
            );
          })}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Sites within 1 mi">
        <FeatureGroup>
          {layer1POIs.length > 0
            ? layer1POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]}>
                    <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
                  </Marker>
                );
              })
            : null}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Sites within 5 mi">
        <FeatureGroup>
          {layer2POIs.length > 0
            ? layer1POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]}>
                    <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
                  </Marker>
                );
              })
            : null}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Sites within 10 mi">
        <FeatureGroup>
          {layer1POIs.length > 0
            ? layer3POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]}>
                    <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
                  </Marker>
                );
              })
            : null}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Sites within 25 mi">
        <FeatureGroup>
          {layer1POIs.length > 0
            ? layer4POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]}>
                    <POIPopUp position={[lat, lng]} poi={poi}></POIPopUp>
                  </Marker>
                );
              })
            : null}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Sites within 50 mi">
        <FeatureGroup>
          {layer1POIs.length > 0
            ? layer5POIs.map((poi, idx) => {
                const lat = poi.geometry.coordinates[1];
                const lng = poi.geometry.coordinates[0];
                return (
                  <Marker key={idx} position={[lat, lng]}>
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
