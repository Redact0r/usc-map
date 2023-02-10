import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [position, setPosition] = useState(null);
  const [testMode] = useState(process.env.REACT_APP_TEST_MODE === "true");

  const handleNewPosition = (newcoords) => setPosition((_) => newcoords);

  return (
    <UserContext.Provider value={{ position, handleNewPosition, testMode }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
