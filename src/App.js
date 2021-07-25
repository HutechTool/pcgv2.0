import React from "react";
import "./App.css";

import CheckFile from "./component/CheckFile";
import Navbar from "./component/Navbar";
import SaveFile from "./component/SaveFile";
import PhanCongGV from "./component/PhanCongGV";

import { screens } from "./handleFile/Variables";

function swichScreen(screen) {
  switch (screen) {
    case screens.CheckFile:
      return <CheckFile />;
    case screens.PhanCongGV:
      return <PhanCongGV />;
    case screens.SaveFile:
      return <SaveFile />;

    default:
      return <CheckFile />;
  }
}
function App() {
  const [mode, setMode] = React.useState("checkFile");
  return (
    <>
      <Navbar changeMode={setMode} />
      {swichScreen(mode)}
    </>
  );
}

export default App;
