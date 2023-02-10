import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [testMode] = useState(process.env.REACT_APP_TEST_MODE === "true");
  const [position, setPosition] = useState(null);
  const [distanceRadiusFilter, setDistanceRadiusFilter] = useState(0);

  const handleNewPosition = (newcoords) => setPosition((_) => newcoords);
  const handleRadiusChange = (num) => setDistanceRadiusFilter(num);

  return (
    <UserContext.Provider
      value={{
        testMode,
        position,
        handleNewPosition,
        distanceRadiusFilter,
        setDistanceRadiusFilter,
        handleRadiusChange,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
