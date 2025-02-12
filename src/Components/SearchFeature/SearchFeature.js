import React, { useState } from "react";
import { useMap } from "react-leaflet";
import "./SearchFeature.css";

const SearchFeature = ({ pointsOfInterest, isOpen, isDisplayOpen }) => {
  const [filteredPOIs, setFilteredPOIs] = useState(pointsOfInterest.features);
  const allPOIs = pointsOfInterest.features ?? [];

  const map = useMap();

  const handleSearchChange = (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredList = allPOIs.filter((poi) => {
      const lowerCaseName = poi.properties.Name.toLowerCase();
      const lowerCaseDesc = poi.properties.Description_full.toLowerCase();
      return (
        lowerCaseName.includes(searchString) ||
        lowerCaseDesc.includes(searchString)
      );
    });

    setFilteredPOIs(filteredList);
  };

  const handleResultClick = (e) => {
    const str = e.currentTarget.id;
    const coor = str.split(",");
    const latLng = [parseFloat(coor[1]), parseFloat(coor[0])];

    map.flyTo(latLng, map.getZoom());
  };

  return (
    <div
      className="container"
      style={{ display: isOpen && isDisplayOpen ? "block" : "none" }}
    >
      <h1>Search Feature</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearchChange(e)}
      ></input>
      <div className="results">
        {filteredPOIs.map((poi, idx) => {
          return (
            <div
              className="results-item"
              key={idx}
              id={poi.geometry.coordinates}
              onClick={(e) => handleResultClick(e)}
            >
              <div className="results-item-column results-item-name">
                <h3>{poi.properties.Name}</h3>
              </div>
              <div className="results-item-column results-item-desc">
                <p>{poi.properties.Description_full}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchFeature;
