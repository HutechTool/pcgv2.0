import React, { useEffect } from "react";

import getFilePromise from "../promise/getFilePromise";
import { phanCongGiangVien } from "../handleFile/checkFile";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useSemester } from "../firebase/firebase";
import ResultPhanCong from "./ResultPhanCong";

function CompareOneFireBase() {
  const [data3DoAn, setData3DoAn] = React.useState("");
  const [dataPhanCong, setDataPhanCong] = React.useState(null);

  const [objectPhanCong, setObjectPhanCong] = React.useState(null);

  const allSemester = useSemester();

  useEffect(() => {
    setObjectPhanCong(null);
    if (!data3DoAn || !dataPhanCong?.length) return;
    const phanCong = phanCongGiangVien(data3DoAn, dataPhanCong);
    setObjectPhanCong(phanCong);
  }, [data3DoAn, dataPhanCong]);

  const handleChangePhanCong = async (event) => {
    setDataPhanCong(null);
    const file = event.target.files[0];
    if (file == null) return;
    const data = await getFilePromise(file);
    setDataPhanCong(data);
  };
  const handleChange = (event) => {
    setData3DoAn(event.target.value);
  };
  // note: nếu trùng MSSV giữa các sheet thì sẽ lấy MSSV của cái lớn nhất (Tổng hợp > Chuyên ngành > Cơ sở)
  return (
    <section className="masthead bg-primary text-white text-center min-vh-100">
      <div className="container d-flex align-items-center flex-column">
        <h1 className="mb-4 heading-text">Một học kỳ</h1>
        <div className="row">
          <div className="col">
            <h5 className="mb-1 sub-text">Chọn dữ liệu đồ án</h5>
            <FormControl variant="filled" style={{ minWidth: "200px" }}>
              <InputLabel
                id="demo-simple-select-filled-label"
                className="text-white"
              >
                Học kỳ
              </InputLabel>
              <Select
                className="text-white text-left"
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={data3DoAn}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allSemester &&
                  allSemester.map((semester) => {
                    return (
                      <MenuItem key={semester.id} value={semester.data}>
                        {semester.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div className="col mb-4">
            <h5 className="mb-1 sub-text">Chọn dữ liệu phân công</h5>
            <input
              type="file"
              className="btn btn-light mt-1"
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

export default CompareOneFireBase;
