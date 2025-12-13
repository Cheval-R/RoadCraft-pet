import { useState } from "react";
import { NodesContext } from "./NodesContext";

const NodesProvider = ({ children }) => {
  const [nodesList, setNodesList] = useState([]);

  return (
    <NodesContext.Provider value={{ nodesList, setNodesList }}>
      {children}
    </NodesContext.Provider>
  );
};

export default NodesProvider;
