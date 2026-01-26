import { useState } from "react";
import { NodesContext } from "./NodesContext";

const NodesProvider = ({ children }) => {
  const [nodesList, setNodesList] = useState([]);
  const [formNodeData, setFormNodeData] = useState({
    isActive: false,
    x: 0,
    y: 0,
  });
  return (
    <NodesContext.Provider
      value={{ nodesList, setNodesList, formNodeData, setFormNodeData }}
    >
      {children}
    </NodesContext.Provider>
  );
};

export default NodesProvider;
