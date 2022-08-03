import React, { createContext, useState } from "react";

const HomeContext = createContext();


const ContextProvider = ({ children }) => {
 const [refresh,setRefresh] = useState(false);

return (
    <HomeContext.Provider value={{
     refresh,setRefresh,
    }} >
      {children}
    </HomeContext.Provider>
  );
};
export {ContextProvider, HomeContext};