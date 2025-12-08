import WorkSpace from "./components/WorkSpace/WorkSpace";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div
      style={{
        fontFamily: "Victor Mono, Roboto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // ← важно!
      }}
    >
      <h1 style={{ margin: 0, padding: 0, background: "#21252b" }}>
        Road Craft - pet
      </h1>

      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0, // ← ключ! иначе flex дети могут выходить за границу
          overflow: "hidden",
        }}
      >
        <Sidebar />
        <WorkSpace />
      </div>
    </div>
  );
}

export default App;
