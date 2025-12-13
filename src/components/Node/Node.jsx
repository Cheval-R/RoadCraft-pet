import { useContext } from "react";
import { NodesContext } from "../../context/NodesContext";

const Node = ({ nodeData, viewport, id }) => {
  const { setNodesList } = useContext(NodesContext);

  const statusChangeHandler = () => {
    setNodesList((prev) => {
      return prev.map((node) => {
        if (node.id === nodeData.id)
          return {
            ...node,
            status: !node.status,
          };
        return node;
      });
    });
  };
  return (
    <div
      id={id}
      className="node"
      style={{
        position: "absolute",
        top: nodeData.y,
        left: nodeData.x,

        transform: `translate(${viewport.offsetX * viewport.zoom}px, ${
          viewport.offsetY * viewport.zoom
        }px) scale(${viewport.zoom})`,

        border: "1px solid black",
        borderRadius: "15px",
        padding: "15px",

        width: "205px",
        maxWidth: "205px",
      }}
    >
      <h3
        style={{
          overflowWrap: "break-word",
          wordBreak: "break-all",
          hyphens: "auto",
        }}
      >
        {nodeData.title}
      </h3>
      <p
        style={{
          overflowWrap: "break-word",
          wordBreak: "break-all",
          hyphens: "auto",
        }}
      >
        {nodeData.description}
      </p>
      <label style={{ display: "flex", gap: "10px" }}>
        {nodeData.status ? (
          <p style={{ color: "green" }}>Done</p>
        ) : (
          <p style={{ color: "orange" }}>In Progress</p>
        )}
        <input
          type="checkbox"
          checked={nodeData.status}
          onChange={statusChangeHandler}
        />
      </label>
    </div>
  );
};

export default Node;
