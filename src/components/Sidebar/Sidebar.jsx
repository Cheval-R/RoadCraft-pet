const Sidebar = () => {
  const list = ['one', 'two', 'three', 'four', 'five'];
  return (
    <aside>
      <ul
        style={{
          padding: '15px',
          margin: 'unset',
          maxWidth: 'max-content',
          height: '100%',
          boxSizing: 'border-box',
          background: '#21252b',
        }}
      >
        {list.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
