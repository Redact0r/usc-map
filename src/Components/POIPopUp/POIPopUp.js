import React, { useState } from "react";
import { Popup } from "react-leaflet";
import "./POIPopUp.css";

const POIPopUp = (props) => {
  const { position, poi } = props;
  const { Name, Description_full, Images } = poi.properties;
  const imgAttr = poi.properties["Image Attribution"];
  const txtAttr = poi.properties["Text Attribution"];

  const descriptionTruncated = Description_full.split(" ")
    .splice(0, 20)
    .join(" ");

  const [description, setDescription] = useState(descriptionTruncated);
  const [buttonText, setButtonText] = useState("...Read More");

  const handleReadMoreButtonClick = (e) => {
    const paragraph = e.target.parentElement;

    if (paragraph.classList.contains("expanded")) {
      setDescription(descriptionTruncated);
      paragraph.classList.remove("expanded");
      setButtonText("...Read More");
    } else {
      setDescription(Description_full);
      paragraph.classList.add("expanded");
      setButtonText("...Read Less");
    }
  };

  return (
    <Popup position={position} className="popup-container">
      <h3>{Name}</h3>
      <p className="popup-paragraph">
        {`${description}`}
        {description.length > 0 ? (
          <button
            className={"readMoreButton"}
            onClick={(e) => handleReadMoreButtonClick(e)}
          >
            {buttonText}
          </button>
        ) : null}
      </p>
      {Description_full.length > 0 ? <sub>{txtAttr}</sub> : null}
      <img
        className={"popup-image"}
        src={Images}
        alt={`${Name} Scenic View`}
        width="100%"
      />
      <sub>{imgAttr}</sub>
    </Popup>
  );
};

export default POIPopUp;
