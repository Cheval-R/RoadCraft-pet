import { useState, useContext } from "react";
import { NodesContext } from "../../context/NodesContext";

const FormNode = ({ formNodeData, viewport, setFormNodeData }) => {
  const { nodesList, setNodesList } = useContext(NodesContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // ! переписать на универсальную функцию создания узла (передача даты в функцию и запись даты в узел)
  const createNodeHandler = (event) => {
    if (title === "" && desc === "") return;
    setNodesList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: title,
        description: desc,
        x: formNodeData.x,
        y: formNodeData.y,
        status: false,
      },
    ]);
    setFormNodeData({ isActive: false });
    setTitle("");
    setDesc("");
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return formNodeData.isActive ? (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",

        padding: "15px",
        borderRadius: "15px",
        border: "1px solid black",

        position: "absolute",
        top: formNodeData.y,
        left: formNodeData.x,
        transform: `translate(${viewport.offsetX * viewport.zoom}px, ${
          viewport.offsetY * viewport.zoom
        }px) scale(${viewport.zoom})`,
      }}
    >
      <legend>Create node</legend>
      <input
        required={true}
        onChange={handleChange(setTitle)}
        value={title}
        type="text"
        placeholder="Node title"
      />
      <input
        required={true}
        onChange={handleChange(setDesc)}
        type="text"
        value={desc}
        placeholder="Node desc"
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          createNodeHandler(event);
        }}
      >
        create
      </button>
    </form>
  ) : null;
};

export default FormNode;
