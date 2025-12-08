import { useState } from "react";
import Canvas from "./Canvas/Canvas";
import NodesLayout from "./NodesLayout/NodesLayout";

const WorkSpace = () => {
  const [nodesList, setNodeList] = useState([
    { title: "1st node", x: 100, y: 100, description: "1st node description" },
    { title: "2nd node", x: 300, y: 100, description: "2nd node description" },
    { title: "3rd node", x: 500, y: 100, description: "3rd node description" },
  ]);

  const [viewport, setViewport] = useState({
    offset: { x: 0.0, y: 0.0 },
    zoom: 1,
  });

  const [isDragging, setIsDragging] = useState(false);

  function handleClick(event) {
    const coordinates = {
      x: event.nativeEvent.offsetX - viewport.offset.x,
      y: event.nativeEvent.offsetY - viewport.offset.y,
    };
    console.log();
    console.log();

    setNodeList([
      ...nodesList,
      {
        title: "another node",
        x: coordinates.x,
        y: coordinates.y,
        description: "another node description",
      },
    ]);
  }

  const handleMouseDown = (event) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
      offset: {
        x: prev.offset.x + event.movementX,
        y: prev.offset.y + event.movementY,
      },
    }));
  };

  return (
    <div
      id="workspace"
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <NodesLayout
        nodesList={nodesList}
        onClick={handleMouseDown}
        viewport={viewport}
      />
    </div>
  );
};

export default WorkSpace;
