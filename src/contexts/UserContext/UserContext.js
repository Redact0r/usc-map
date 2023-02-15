import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [testMode] = useState(process.env.REACT_APP_TEST_MODE === "true");
  const [position, setPosition] = useState(null);
  const [distanceRadiusFilter, setDistanceRadiusFilter] = useState(0);
  const [layer1POIs, setLayer1POIs] = useState([]);
  const [layer2POIs, setLayer2POIs] = useState([]);
  const [layer3POIs, setLayer3POIs] = useState([]);

  const handleNewPosition = (newcoords) => setPosition((_) => newcoords);
  const handleRadiusChange = (num) => setDistanceRadiusFilter((_) => num);
  const handleLayer1Change = (pointsOfInterest) => {
    setLayer1POIs((_) => pointsOfInterest);
  };
  const handleLayer2Change = (pointsOfInterest) => {
    setLayer2POIs((_) => pointsOfInterest);
  };
  const handleLayer3Change = (pointsOfInterest) => {
    setLayer3POIs((_) => pointsOfInterest);
  };

  return (
    <UserContext.Provider
      value={{
        testMode,
        position,
        handleNewPosition,
        distanceRadiusFilter,
        setDistanceRadiusFilter,
        handleRadiusChange,
        layer1POIs,
        layer2POIs,
        layer3POIs,
        setLayer1POIs,
        setLayer2POIs,
        setLayer3POIs,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
