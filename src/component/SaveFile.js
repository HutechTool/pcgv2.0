import React from "react";

import { get3SemesterPromise } from "../promise/getFilePromise";
import { addSemester } from "../firebase/firebase";

function CheckFile() {
  const [data, setData] = React.useState(null);
  const [nameFile, setNameFile] = React.useState("");

  const handleOnChange = async (event) => {
    setData(null);
    const file = event.target.files[0];
    if (file == null) return;
    const data = await get3SemesterPromise(file);
    setData(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameFile || nameFile.trim() === "") {
      alert("Chưa nhập tên file");
      return;
    }
    addSemester(nameFile, data);
    setNameFile("");
    alert("Lưu file thành công");
  };

  return (
    <section className="masthead bg-primary text-white text-center min-vh-100">
      <div className="container d-flex align-items-center flex-column">
        <h1 className="mb-4 heading-text">Lưu file</h1>
        <h5 className="mb-2 sub-text">Lưu file lên FireBase</h5>
        <form onSubmit={handleSubmit}>
          <p className="mt-4 mb-1 sub-text">Chọn file</p>
          <input
            type="file"
            className="btn btn-light"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleOnChange}
          />
          <p className="mt-4 mb-1 sub-text">Nhập tên file</p>
          <input
            type="text"
            value={nameFile}
            className="form-control form-control-lg mb-3"
            onChange={(e) => setNameFile(e.target.value)}
          />
          <button type="submit" className="btn btn-success">
            Lưu file
          </button>
        </form>
      </div>
    </section>
  );
}

export default CheckFile;
