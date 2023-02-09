import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [position, setPosition] = useState(null);

  const handleNewPosition = (newcoords) => setPosition((_) => newcoords);

  return (
    <UserContext.Provider value={{ position, handleNewPosition }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
