import React, { useEffect } from "react";

import getFilePromise, { get3SemesterPromise } from "../promise/getFilePromise";
import { phanCongGiangVien } from "../handleFile/checkFile";
import ResultPhanCong from "./ResultPhanCong";

function CompareInputFile() {
  const [data3DoAn, setData3DoAn] = React.useState(null);
  const [dataPhanCong, setDataPhanCong] = React.useState(null);

  const [objectPhanCong, setObjectPhanCong] = React.useState(null);

  useEffect(() => {
    setObjectPhanCong(null);
    if (!data3DoAn || !dataPhanCong?.length) return;
    const phanCong = phanCongGiangVien(data3DoAn, dataPhanCong);
    setObjectPhanCong(phanCong);
  }, [data3DoAn, dataPhanCong]);

  const handleChange3DoAn = async (event) => {
    setData3DoAn(null);
    const file = event.target.files[0];
    if (file == null) return;
    const data3x = await get3SemesterPromise(file);
    setData3DoAn(data3x);
  };
  const handleChangePhanCong = async (event) => {
    setDataPhanCong(null);
    const file = event.target.files[0];
    if (file == null) return;
    const data = await getFilePromise(file);
    setDataPhanCong(data);
  };
  // note: nếu trùng MSSV giữa các sheet thì sẽ lấy MSSV của cái lớn nhất (Tổng hợp > Chuyên ngành > Cơ sở)
  return (
    <section className="masthead bg-primary text-white text-center min-vh-100">
      <div className="container d-flex align-items-center flex-column">
        <h1 className="mb-3 heading-text">Nhập bằng file</h1>
        <h4 className="mb-5">Phân công bằng cách chọn file tải lên</h4>
        <div className="row">
          <div className="col">
            <h5 className="mb-1 sub-text">Chọn dữ liệu đồ án</h5>
            <input
              type="file"
              className="btn btn-light"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleChange3DoAn}
            />
          </div>
          <div className="col mb-4">
            <h5 className="mb-1 sub-text">Chọn dữ liệu phân công</h5>
            <input
              type="file"
              className="btn btn-light"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleChangePhanCong}
            />
          </div>
        </div>
        <ResultPhanCong objectPhanCong={objectPhanCong} />
      </div>
    </section>
  );
}

export default CompareInputFile;
