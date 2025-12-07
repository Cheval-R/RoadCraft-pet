import { useState } from 'react';
import Canvas from '../Canvas/Canvas';
import Node from '../Node/Node';

const WorkSpace = () => {
  const [nodesList, setNodeList] = useState([
    { title: '1st node', x: 100, y: 100, description: '1st node description' },
    { title: '2nd node', x: 300, y: 100, description: '2nd node description' },
    { title: '3rd node', x: 500, y: 100, description: '3rd node description' },
  ]);
  return (
    <div style={{ flex: '1 1 auto', position: 'relative' }}>
      <Canvas />
      {console.log(nodesList.length)}
      {nodesList.map((node) => {
        return (
          <Node
            nodeData={node}
            key={node.title}
          />
        );
      })}
    </div>
  );
};

export default WorkSpace;
