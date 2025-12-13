import { useState } from "react";
import NodesLayout from "../NodesLayout/NodesLayout";

const WorkSpace = () => {
  // const [nodesList, setNodeList] = useState([
  //   {
  //     title: "1st node",
  //     x: 100,
  //     y: 100,
  //     description: "1st node description",
  //     status: "false",
  //   },
  // ]);

  return (
    <div
      id="workspace"
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <NodesLayout />
    </div>
  );
};

export default WorkSpace;
