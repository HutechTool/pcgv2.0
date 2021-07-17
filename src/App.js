import React from "react";
import "./App.css";
import CheckFile from "./component/CheckFile";
import CompareSemester from "./component/CompareSemester";
import Navbar from "./component/Navbar";
function App() {
  const [mode, setMode] = React.useState("checkFile");
  return (
    <>
      <Navbar changeMode={setMode} />
      {mode === "checkFile" ? <CheckFile /> : <CompareSemester />}
    </>
  );
}

export default App;
