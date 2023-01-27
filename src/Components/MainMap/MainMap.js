import React from "react";
import {
  MapContainer,
  GeoJSON,
  TileLayer,
  Marker,
  MarkerProps,
  Popup,
  ScaleControl,
  LayersControl,
  FeatureGroup,
} from "react-leaflet";
import POIPopUp from "../POIPopUp/POIPopUp";
import "leaflet/dist/leaflet.css";
import "./MainMap.css";

const MainMap = (props) => {
  const filterByDistance = (name) => {
    return name.indexOf("Ark") > -1;
  };

  const { pointsOfInterest } = props;
  const pointsOfInterestOneMile = pointsOfInterest.features.filter((poi) =>
    filterByDistance(poi.properties.Name)
  );
  console.log(pointsOfInterestOneMile);

  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw" }}
      zoom={12}
      center={[33.66155, -78.9379]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ScaleControl />
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
          <FeatureGroup>
            {pointsOfInterestOneMile.map((poi, idx) => {
              const lat = poi.geometry.coordinates[1];
              const lon = poi.geometry.coordinates[0];
              return (
                <Marker key={idx} position={[lat, lon]} color={"red"}>
                  <POIPopUp position={[lat, lon]} poi={poi}></POIPopUp>
                </Marker>
              );
            })}
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Sites within 5 mi">
          <FeatureGroup></FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Sites within 10 mi">
          <FeatureGroup></FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
      ;
    </MapContainer>
  );
};

export default MainMap;
