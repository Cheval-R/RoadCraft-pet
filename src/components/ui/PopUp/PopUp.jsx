const PopUp = ({ type, viewport, x, y }) => {
  const popUpsList = [
    {
      type: "node",
      list: [
        { id: "del", label: "Delete" },
        { id: "edit", label: "Edit" },
        { id: "connect", label: "Connect" },
        { id: "add", label: "Connect With New Node" },
      ],
    },
    {
      type: "workspace",
      list: [{ id: "add", label: "Add Node" }],
    },
  ];

  const list = popUpsList.find((p) => p.type === type)?.list ?? [];

  return (
    <ul
      style={{
        position: "absolute",
        top: y,
        left: x,
        transform: `translate(${viewport.offset.x * viewport.zoom}px, ${
          viewport.offset.y * viewport.zoom
        }px) scale(${viewport.zoom})`,
      }}
    >
      {list.map((item) => {
        return (
          <li
            key={item.id}
            id={item.id}
          >
            {item.label}
          </li>
        );
      })}
    </ul>
  );
};

export default PopUp;
