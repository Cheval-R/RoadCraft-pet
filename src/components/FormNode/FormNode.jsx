import { useState, useContext, useRef, useEffect } from "react";
import { NodesContext } from "../../context/NodesContext";

const FormNode = ({ viewport }) => {
  const nodeFormRef = useRef(null);
  const { setNodesList, formNodeData, setFormNodeData } =
    useContext(NodesContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  let offsetX = undefined;
  let offsetY = undefined;
  useEffect(() => {
    function handleOutsideClick(event) {
      offsetX = viewport.offsetX;
      offsetY = viewport.offsetY;
      // if (!formNodeData.isActive || !nodeFormRef.current) return;
      // ! Выскакивает ошибка обработчика клика, он висит сразу
    }

    function handleCloseForm(event) {
      if (event.key === "Escape") {
        closeForm();
      }
      if (!nodeFormRef.current.contains(event.target)) {
        if (offsetX === undefined || offsetX === viewport.offsetX) closeForm();
      }
    }
    // Если будет открыто несколько модалок, то нужно создать стек с порядком отрытых окон и выключать их в очередности
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("mouseup", handleCloseForm);
    document.addEventListener("keydown", handleCloseForm);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("mouseup", handleCloseForm);
      document.removeEventListener("keydown", handleCloseForm);
    };
  }, [formNodeData.isActive]);

  const closeForm = () => {
    setFormNodeData((prev) => ({
      ...prev,
      isActive: false,
    }));
  };

  // ! переписать на универсальную функцию создания узла (передача даты в функцию и запись даты в узел)
  const createNodeHandler = (event) => {
    if (title === "" || desc === "") return;
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
      ref={nodeFormRef}
      className="node node--form"
      id="node-form"
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
