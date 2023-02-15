import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [testMode] = useState(process.env.REACT_APP_TEST_MODE === "true");
  const [position, setPosition] = useState(null);
  const [distanceRadiusFilter, setDistanceRadiusFilter] = useState(0);
  const [layer1POIs, setLayer1POIs] = useState([]);
  const [layer2POIs, setLayer2POIs] = useState([]);
  const [layer3POIs, setLayer3POIs] = useState([]);
  const [layer4POIs, setLayer4POIs] = useState([]);
  const [layer5POIs, setLayer5POIs] = useState([]);

  const handleNewPosition = (newcoords) => setPosition((_) => newcoords);
  const handleLayer1Change = (pointsOfInterest) => {
    setLayer1POIs((_) => pointsOfInterest);
  };
  const handleLayer2Change = (pointsOfInterest) => {
    setLayer2POIs((_) => pointsOfInterest);
  };
  const handleLayer3Change = (pointsOfInterest) => {
    setLayer3POIs((_) => pointsOfInterest);
  };
  const handleLayer4Change = (pointsOfInterest) => {
    setLayer4POIs((_) => pointsOfInterest);
  };
  const handleLayer5Change = (pointsOfInterest) => {
    setLayer5POIs((_) => pointsOfInterest);
  };

  return (
    <UserContext.Provider
      value={{
        testMode,
        position,
        handleNewPosition,
        distanceRadiusFilter,
        setDistanceRadiusFilter,
        layer1POIs,
        layer2POIs,
        layer3POIs,
        layer4POIs,
        layer5POIs,
        handleLayer1Change,
        handleLayer2Change,
        handleLayer3Change,
        handleLayer4Change,
        handleLayer5Change,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
