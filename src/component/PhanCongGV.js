import React from "react";
import { modes } from "../handleFile/Variables";
import CompareInputFile from "./CompareInputFile";
import CompareManyFireBase from "./CompareManyFireBase";
import CompareOneFireBase from "./CompareOneFireBase";

function PhanCongGV() {
  const [mode, setMode] = React.useState(modes.One);

  return (
    <section
      className="masthead bg-primary text-white text-center min-vh-100"
      style={{ paddingTop: "104px" }}
    >
      <div className="container d-flex align-items-center flex-column">
        <div className="row">
          <button
            className="col nav-link text-nowrap"
            type="button"
            onClick={() => setMode(modes.One)}
          >
            {modes.One}
          </button>
          <button
            className="col nav-link text-nowrap"
            type="button"
            onClick={() => setMode(modes.Many)}
          >
            {modes.Many}
          </button>
          <button
            className="col nav-link text-nowrap"
            type="button"
            onClick={() => setMode(modes.File)}
          >
            {modes.File}
          </button>
        </div>
        {changeMode(mode)}
      </div>
    </section>
  );
}
function changeMode(mode) {
  switch (mode) {
    case modes.One:
      return <CompareOneFireBase />;
    case modes.Many:
      return <CompareManyFireBase />;
    case modes.File:
      return <CompareInputFile />;

    default:
      return <CompareOneFireBase />;
  }
}

export default PhanCongGV;
