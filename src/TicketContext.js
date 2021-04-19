import React, { useState } from "react";

let TicketContext = React.createContext();

export default TicketContext;

export const TicketProvider = ({ children }) => {
  let [data, setData] = useState([]);
  let [queryData, setQueryData] = useState([]);

  return (
    <TicketContext.Provider
      value={{ value1: [data, setData], value2: [queryData, setQueryData] }}
    >
      {children}
    </TicketContext.Provider>
  );
};
