const Node = ({ nodeData }) => {
  return (
    <div style={{ position: 'absolute', top: nodeData.y, left: nodeData.x }}>
      <h3>{nodeData.title}</h3>
      <p>{nodeData.description}</p>
    </div>
  );
};

export default Node;
