import React, { createContext, useState } from 'react';

// Taken from: 
// https://www.geeksforgeeks.org/how-to-share-state-across-react-components-with-context/

export const SharedContext = createContext();

export const SharedProvider = ({children}) => {
  const [userData, setUserData] = useState({});

  return (
    <SharedContext.Provider value={{ userData, setUserData }}>
      {children}
    </SharedContext.Provider>
  );
};