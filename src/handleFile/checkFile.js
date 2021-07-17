import { tenDoAn, tangDoAn } from "./Variables";
//=================== Kiem tra 1 file ===================
function dicDuplicateMSSV(data3x) {
  let count = 0;
  const dicDuplicate = {};
  const dictionary = {};
  tenDoAn.forEach((loaiDoAn) => {
    data3x[loaiDoAn].forEach((column) => {
      const arrayValuesColumn = Object.values(column);
      const MSSV = arrayValuesColumn[0];
      column["Tên môn học"] = loaiDoAn;
      if (dictionary[MSSV] !== undefined) {
        if (dicDuplicate[MSSV] === undefined) {
          dicDuplicate[MSSV] = [dictionary[MSSV]["Tên môn học"], loaiDoAn];
        } else {
          dicDuplicate[MSSV].push(loaiDoAn);
        }
        count++;
      }
      dictionary[MSSV] = column;
    });
  });
  return { count, dicDuplicate };
}
export function getDataFromListDuplicate(data3x) {
  let finalData = [];
  const { count, dicDuplicate } = dicDuplicateMSSV(data3x);
  const arrDuplicate = Object.entries(dicDuplicate);

  arrDuplicate.forEach(([MSSV, arrDup]) => {
    finalData.push({
      MSSV: MSSV,
      Trùng: arrDup.map((item) => rutGonTen(item) + " | "),
    });
  });
  return { count, finalData };
}
function rutGonTen(name) {
  switch (name) {
    case tenDoAn[0]:
      return "Cơ sở";
    case tenDoAn[1]:
      return "Chuyên ngành";
    case tenDoAn[2]:
      return "Tổng hợp";

    default:
      return "lỗi rút gọn tên";
  }
}
//=================== Phan cong giang vien ===================

// note: nếu trùng MSSV giữa các sheet thì sẽ lấy MSSV của cái lớn nhất (Tổng hợp > Chuyên ngành > Cơ sở)
function dictionary3xData(data3x) {
  const dictionary = {};
  tenDoAn.forEach((loaiDoAn) => {
    data3x[loaiDoAn].forEach((column) => {
      const arrayValuesColumn = Object.values(column);
      const MSSV = arrayValuesColumn[0];
      column["Tên môn học"] = loaiDoAn;
      dictionary[MSSV] = column;
    });
  });
  return dictionary;
}

function getArrayMSSVFrom1File(data) {
  const array = [];
  data.forEach((column) => {
    const arrayValuesColumn = Object.values(column);
    const MSSV = arrayValuesColumn[0];
    array.push(MSSV);
  });
  return array;
}

export function phanCongGiangVien(data3DoAn, dataPhanCong) {
  const dictionary3x = dictionary3xData(data3DoAn);
  const arrayPhanCong = getArrayMSSVFrom1File(dataPhanCong);

  const dictionaryDaPhanCong = {};
  const dictionaryChuaPhanCong = {};
  arrayPhanCong.forEach((MSSV) => {
    if (dictionary3x[MSSV] !== undefined) {
      dictionaryDaPhanCong[MSSV] = tangDoAn(dictionary3x[MSSV]["Tên môn học"]);
    } else {
      dictionaryChuaPhanCong[MSSV] = "Chưa được phân công";
    }
  });
  return {
    Data3x: changeDicToData3x(dictionary3x, dictionaryDaPhanCong),
    Done: changeToDataDaPhanCong(dictionaryDaPhanCong, dictionary3x),
    Unassigned: changeToDataChuaPhanCong(dictionaryChuaPhanCong),
  };
}

function changeDicToData3x(dictionary3x, dictionaryDaPhanCong) {
  const data3x = {
    [tenDoAn[0]]: [],
    [tenDoAn[1]]: [],
    [tenDoAn[2]]: [],
  };
  const dicDaPhanCong = PhanCongDoAnMoi(dictionary3x, dictionaryDaPhanCong);
  const arrSV = Object.values(dicDaPhanCong);

  arrSV.forEach((sinhVien) => {
    switch (sinhVien["Tên môn học"]) {
      case tenDoAn[0]:
        data3x[tenDoAn[0]].push(sinhVien);
        break;
      case tenDoAn[1]:
        data3x[tenDoAn[1]].push(sinhVien);
        break;
      case tenDoAn[2]:
        data3x[tenDoAn[2]].push(sinhVien);
        break;
      default:
        break;
    }
  });
  return data3x;
}
function changeToDataDaPhanCong(dictionary, dicData) {
  const data = [];
  const arrayDic = Object.entries(dictionary);

  arrayDic.forEach(([MSSV, tenMonHoc]) => {
    if (dicData[MSSV] !== undefined) {
      const sinhVien = dicData[MSSV];
      sinhVien["Tên môn học"] = tenMonHoc;
      data.push(sinhVien);
    }
  });
  return data;
}
function changeToDataChuaPhanCong(dictionary) {
  const data = [];
  const arrayDic = Object.entries(dictionary);
  arrayDic.forEach(([MSSV, tenMonHoc]) => {
    data.push({ MSSV: MSSV, "Tên môn học": tenMonHoc });
  });
  return data;
}

function PhanCongDoAnMoi(dictionary3x, dictionaryDaPhanCong) {
  const arrayDicDaPhanCong = Object.entries(dictionaryDaPhanCong);
  arrayDicDaPhanCong.forEach(([MSSV, tenMonHoc]) => {
    if (dictionary3x[MSSV] !== undefined) {
      dictionary3x[MSSV]["Tên môn học"] = tenMonHoc;
    }
  });
  return dictionary3x;
}
