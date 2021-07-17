import React, { useEffect } from "react";

import { get3SemesterPromise } from "../promise/getFilePromise";
import { getDataFromListDuplicate } from "../handleFile/checkFile";
import Table from "./Table";

function CheckFile() {
  const [data, setData] = React.useState(null);
  const [duplicate, setDuplicate] = React.useState(null);

  useEffect(() => {
    setDuplicate(null);
    if (!data) return;
    const dataDuplicate = getDataFromListDuplicate(data);
    setDuplicate(dataDuplicate);
  }, [data]);

  const handleOnChange = async (event) => {
    setData(null);
    const file = event.target.files[0];
    if (file == null) return;
    const data = await get3SemesterPromise(file);
    setData(data);
  };

  return (
    <section className="masthead bg-primary text-white text-center min-vh-100">
      <div className="container d-flex align-items-center flex-column">
        <h1 className="mb-4 heading-text">Kiểm tra file</h1>
        <p className="mb-2 sub-text">Kiểm tra có trùng sinh viên nào không</p>
        <input
          type="file"
          className="btn btn-light"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleOnChange}
        />
        <div className="mt-3">
          {duplicate?.finalData?.length ? (
            <>
              <p className="mb-2 sub-text">
                Tổng số dòng bị trùng: {duplicate.count}
              </p>
              <Table
                titleTable="Những cột bị trùng MSSV"
                data={duplicate.finalData}
              />
            </>
          ) : (
            <Table titleTable="Những cột bị trùng MSSV" data={[]} />
          )}
        </div>
      </div>
    </section>
  );
}

export default CheckFile;
