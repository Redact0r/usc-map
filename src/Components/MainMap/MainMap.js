import React, { useState, useEffect } from "react";
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
  useMapEvents,
} from "react-leaflet";
import POIPopUp from "../POIPopUp/POIPopUp";
import "leaflet/dist/leaflet.css";
import "./MainMap.css";
import Sidebar from "../Sidebar/Sidebar";
import CurrentLocation from "../CurrentLocation/CurrentLocation";

const MainMap = (props) => {
  const [centerOfMap, setCenterOfMap] = useState([33.66155, -78.9379]);
  const [distanceRadiusFilter, setDistanceRadiusFilter] = useState(0);

  const MapBox = props.mapboxgl;

  const testMode = props.testMode;

  const filterByDistance = (distance) => {
    return MapBox.distance();
  };

  const { pointsOfInterest } = props;

  return (
    <div>
      <MapContainer
        style={{ height: "100vh", width: "100vw" }}
        zoom={15}
        center={centerOfMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CurrentLocation testMode={testMode} />
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
            <FeatureGroup></FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Sites within 5 mi">
            <FeatureGroup></FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Sites within 10 mi">
            <FeatureGroup></FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <Sidebar />
      </MapContainer>
    </div>
  );
};

export default MainMap;
