import { useContext, useEffect, useRef, useState } from "react";
import NodesLayout from "../NodesLayout/NodesLayout";
import { NodesContext } from "../../context/NodesContext";

const WorkSpace = () => {
  // * States
  const { setFormNodeData, setNodesList, nodesList } = useContext(NodesContext);
  const [isNodeDragging, setIsNodeDragging] = useState(false);
  const [draggableNode, setDraggableNode] = useState(null);
  const [isWorkspaceDragging, setIsWorkspaceDragging] = useState(false);
  const [viewport, setViewport] = useState({
    offsetX: 0.0,
    offsetY: 0.0,
    zoom: 1,
  });

  // * Refs

  const layerRef = useRef(null);

  // * Effects

  // useEffect(() => {
  //   if (!layerRef.current) {
  //     return;
  //   }

  //   layerRef.current.onwheel = (e) => {
  //     console.log("wheel", {
  //       deltaY: e.deltaY,
  //       ctrl: e.ctrlKey,
  //       mode: e.deltaMode,
  //     });
  //     e.preventDefault();
  //     e.stopPropagation();

  //     if (e.ctrlKey) {
  //       const speedFactor =
  //         (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) * 10;

  //       setViewport((prev) => {
  //         const pinchDelta = e.deltaY * speedFactor;

  //         return {
  //           ...prev,
  //           zoom: Math.min(
  //             1.3,
  //             Math.max(0.1, prev.zoom * Math.pow(2, pinchDelta))
  //           ),
  //         };
  //       });
  //     }
  //   };
  // }, [setViewport]);

  // * Handlers

  function handleDoubleClick(event) {
    event.preventDefault();
    if (event.target.classList.contains("nodes-layout")) {
      setFormNodeData({
        x: event.nativeEvent.offsetX - viewport.offsetX,
        y: event.nativeEvent.offsetY - viewport.offsetY,
        isActive: true,
      });
    }
  }

  const handleMouseMove = (event) => {
    if (event.buttons !== 1) {
      setIsWorkspaceDragging(false);
      setIsNodeDragging(false);
      return;
    }
    // * Если перемещение не активировано то ничего не делаем
    if (isWorkspaceDragging) {
      // * Меняем viewport
      setViewport((prev) => {
        // console.log({
        //   ...prev,
        //   offsetX: prev.offsetX + event.movementX,
        //   offsetY: prev.offsetY + event.movementY,
        // });
        return {
          ...prev,
          offsetX: prev.offsetX + event.movementX,
          offsetY: prev.offsetY + event.movementY,
        };
      });
    }
    if (isNodeDragging) {
      console.log("form node clicked");
      if (draggableNode.classList.contains("node--form")) {
        setFormNodeData((prev) => ({
          ...prev,
          x: prev.x + event.movementX,
          y: prev.y + event.movementY,
        }));
      } else {
        setNodesList(
          nodesList.map((node) => {
            if (node.id === draggableNode.id) {
              return {
                ...node,
                x: node.x + event.movementX,
                y: node.y + event.movementY,
              };
            }
            return node;
          }),
        );
      }
    }
  };

  const handleMouseDown = (event) => {
    const target = event.target;
    if (target.classList.contains("nodes-layout")) {
      setIsWorkspaceDragging(true);
    }
    const nodeParent = target.closest(".node");
    if (nodeParent) {
      setIsNodeDragging(true);
      setDraggableNode(nodeParent);
    }
  };

  return (
    <div
      ref={layerRef}
      id="workspace"
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
    >
      <NodesLayout viewport={viewport} />
    </div>
  );
};

export default WorkSpace;
