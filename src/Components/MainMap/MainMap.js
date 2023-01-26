import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import pointsOfInterests from "../../assets/data/locationManifest.json";
import "leaflet/dist/leaflet.css";
import "./MainMap.css";

class MainMap extends React.Component {
  state = {};

  componentDidMount() {
    const listOfFeatures = pointsOfInterests.features;

    listOfFeatures.forEach((feature) => {
      const coordinates = feature.geometry.coordinates;

      if (!Array.isArray(coordinates)) {
        console.log(`${feature.properties.Name} coordinates are not an array`);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Map</h1>
        <MapContainer style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
          <GeoJSON data={pointsOfInterests.features} />
        </MapContainer>
      </div>
    );
  }
}

export default MainMap;
