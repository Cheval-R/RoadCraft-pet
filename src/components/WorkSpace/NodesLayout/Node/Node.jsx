const Node = ({ nodeData, viewport }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: nodeData.y,
        left: nodeData.x,
        transform: `translate(${viewport.offset.x * viewport.zoom}px, ${
          viewport.offset.y * viewport.zoom
        }px) scale(${viewport.zoom})`,
      }}
    >
      <h3>{nodeData.title}</h3>
      <p>{nodeData.description}</p>
    </div>
  );
};

export default Node;
