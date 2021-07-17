import React, { useEffect } from "react";

import getFilePromise, { get3SemesterPromise } from "../promise/getFilePromise";
import { phanCongGiangVien } from "../handleFile/checkFile";
import Table from "./Table";
import { ExportAllXLSX } from "./ExportButtonXLSX";

function CompareSemester() {
  const [data3DoAn, setData3DoAn] = React.useState(null);
  const [dataPhanCong, setDataPhanCong] = React.useState(null);

  const [objectPhanCong, setlistPhanCong] = React.useState(null);

  useEffect(() => {
    setlistPhanCong(null);
    if (!data3DoAn || !dataPhanCong?.length) return;
    const phanCong = phanCongGiangVien(data3DoAn, dataPhanCong);
    setlistPhanCong(phanCong);
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
        <h1 className="mb-4 heading-text">Phân công giảng viên</h1>
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
        <div className="mt-3">
          {
            objectPhanCong ? (
              <>
                <h5 className="mb-1">Xuất tất cả file</h5>
                <ExportAllXLSX
                  csvData={objectPhanCong.Data3x || {}}
                  fileName="Đồ án đã phân công"
                />
                <div className="mt-3">
                  <Table
                    titleTable="Sinh viên được phân công"
                    data={objectPhanCong.Done || []}
                  />
                </div>
                <div className="mt-3">
                  <Table
                    titleTable="Sinh viên chưa được phân công"
                    data={objectPhanCong.Unassigned || []}
                  />
                </div>
              </>
            ) : null
            // <>
            //   <Table titleTable="Sinh viên được phân công" data={[]} />
            //   <div className="mt-3">
            //     <Table titleTable="Sinh viên chưa được phân công" data={[]} />
            //   </div>
            // </>
          }
        </div>
      </div>
    </section>
  );
}

export default CompareSemester;
