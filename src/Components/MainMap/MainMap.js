import React from "react";
import {
  MapContainer,
  GeoJSON,
  TileLayer,
  Marker,
  MarkerProps,
  Popup,
} from "react-leaflet";
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

  onEachPOI = (poi, layer) => {
    const poiName = poi.properties.Name;

    layer.bindPopup(poiName);
  };

  render() {
    return (
      <div>
        <h1>Map</h1>
        <MapContainer
          style={{ height: "80vh" }}
          zoom={2}
          center={[-78.9379, 33.66155]}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={pointsOfInterests.features}
            onEachFeature={this.onEachPOI}
          />
        </MapContainer>
      </div>
    );
  }
}

export default MainMap;
