import { useContext } from "react";
import { NodesContext } from "../../context/NodesContext";
import FormNode from "../FormNode/FormNode";
import Node from "../Node/Node";
const NodesLayout = ({ viewport }) => {
  const { nodesList } = useContext(NodesContext);

  return (
    <>
      <div
        className="nodes-layout"
        style={{
          touchAction: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#282c34",
          // transform: " translate(20px,40px) scale(2)",
        }}
      >
        {nodesList?.map((node, index) => {
          return (
            <Node
              nodeData={node}
              key={node.id}
              viewport={viewport}
            />
          );
        })}

        <FormNode viewport={viewport} />
      </div>
    </>
  );
};

export default NodesLayout;
