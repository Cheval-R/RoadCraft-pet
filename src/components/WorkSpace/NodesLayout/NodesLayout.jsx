import Node from "./Node/Node";

const NodesLayout = ({ nodesList, onClick, viewport }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#282c34",
      }}
      onClick={(event) => {
        onClick(event);
      }}
    >
      {nodesList.map((node) => {
        return (
          <Node
            nodeData={node}
            key={node.title}
            viewport={viewport}
          />
        );
      })}
    </div>
  );
};

export default NodesLayout;
