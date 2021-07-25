import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useSemester } from "../firebase/firebase";

import getFilePromise from "../promise/getFilePromise";
import { phanCongGiangVien } from "../handleFile/checkFile";
import ResultPhanCong from "./ResultPhanCong";
import { addPhanCong } from "../handleFile/manyFiles";

function CompareManyFireBase() {
  const [listDoAn, setListDoAn] = React.useState([]);
  const [objectPhanCong, setObjectPhanCong] = React.useState(null);

  const [dataPhanCong, setDataPhanCong] = React.useState(null);

  const allSemester = useSemester();

  const handleCompare = () => {
    if (!listDoAn.length) return;
    if (!dataPhanCong?.length) {
      alert("Mời nhập dữ liệu phân công!");
      return;
    }
    setObjectPhanCong(null);
    // Bien luu du lieu phan cong lan dau tien
    let phanCong = {};
    // Lap tat ca cac do an

    listDoAn.forEach((doAn, index) => {
      if (index === 0) {
        phanCong = phanCongGiangVien(doAn.data, dataPhanCong);
      } else {
        // Dùng các học sinh chưa phân công để phân công tiếp
        const phanCongOther = phanCongGiangVien(doAn.data, phanCong.Unassigned);
        phanCong = addPhanCong(phanCong, phanCongOther);
      }
    });
    setObjectPhanCong(phanCong);
  };
  const handleChangePhanCong = async (event) => {
    setDataPhanCong(null);
    const file = event.target.files[0];
    if (file == null) return;
    const data = await getFilePromise(file);
    setDataPhanCong(data);
  };
  const handleChange = (event) => {
    setListDoAn([...listDoAn, event.target.value]);
  };
  // note: nếu trùng MSSV giữa các sheet thì sẽ lấy MSSV của cái lớn nhất (Tổng hợp > Chuyên ngành > Cơ sở)
  return (
    <section className="masthead bg-primary text-white text-center min-vh-100">
      <div className="container d-flex align-items-center flex-column">
        <h1 className="mb-4 heading-text">Nhiều học kỳ</h1>
        <h5 className="mb-1 sub-text">Chọn dữ liệu đồ án</h5>
        <FormControl
          variant="filled"
          style={{ minWidth: "200px", marginBottom: "10px" }}
        >
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
            value={""}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {allSemester &&
              allSemester.map((semester) => {
                if (listDoAn.some((doan) => doan.name === semester.name))
                  return null;
                return (
                  <MenuItem
                    key={semester.id}
                    value={{ name: semester.name, data: semester.data }}
                  >
                    {semester.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <div className="row w-100 d-flex align-items-center">
          {listDoAn.map((doAn, index) => (
            <div className="col-lg-3 mb-2" key={index}>
              <div className="row">
                <button
                  className="col btn btn-secondary"
                  onClick={() =>
                    setListDoAn(
                      listDoAn.filter((item) => item.name !== doAn.name)
                    )
                  }
                >
                  {doAn.name}
                </button>
                <h4 className="col d-flex align-items-center mb-0">&gt;</h4>
              </div>
            </div>
          ))}
        </div>
        <h5 className="mt-4 sub-text">Chọn dữ liệu phân công</h5>
        <input
          type="file"
          className="btn btn-light mt-1"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleChangePhanCong}
        />
        <button className="btn btn-secondary mt-3" onClick={handleCompare}>
          Phân công
        </button>
        <ResultPhanCong objectPhanCong={objectPhanCong} />
      </div>
    </section>
  );
}

export default CompareManyFireBase;
