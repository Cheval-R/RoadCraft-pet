import { useState, useContext } from "react";
import { NodesContext } from "../../context/NodesContext";
import FormNode from "../FormNode/FormNode";
import Node from "../Node/Node";
const NodesLayout = () => {
  const { nodesList, setNodesList } = useContext(NodesContext);
  const [formNodeData, setFormNodeData] = useState({
    isActive: false,
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [viewport, setViewport] = useState({
    offsetX: 0.0,
    offsetY: 0.0,
    zoom: 1,
  });

  function handleRightClick(event) {
    event.preventDefault();
    if (event.target.classList.contains("nodes-layout")) {
      setFormNodeData({
        x: event.nativeEvent.offsetX - viewport.offsetX,
        y: event.nativeEvent.offsetY - viewport.offsetY,
        isActive: true,
      });
    }
  }

  const handleMouseDown = (event) => {
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    // * Если перемещение не активировано то ничего не делаем
    if (!isDragging) return;
    // * Если нажата какая-то кнопка то тоже не перемещаем и убираем флаг
    if (event.buttons !== 1) {
      setIsDragging(false);
      return;
    }

    // * Меняем viewport
    setViewport((prev) => ({
      ...prev,
      offsetX: prev.offsetX + event.movementX,
      offsetY: prev.offsetY + event.movementY,
    }));
  };
  return (
    <>
      <div
        className="nodes-layout"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#282c34",
        }}
        onContextMenu={handleRightClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        {nodesList?.map((node, index) => {
          return (
            <Node
              nodeData={node}
              id={index}
              key={node.id}
              viewport={viewport}
            />
          );
        })}
      </div>
      <FormNode
        setFormNodeData={setFormNodeData}
        formNodeData={formNodeData}
        viewport={viewport}
      />
    </>
  );
};

export default NodesLayout;
