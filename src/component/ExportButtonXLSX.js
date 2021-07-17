import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { tenDoAn } from "../handleFile/Variables";

export const ExportButtonXLSX = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="btn btn-success"
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      Export
    </button>
  );
};

export const ExportAllXLSX = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = (csvData, fileName) => {
    const ws1 = XLSX.utils.json_to_sheet(csvData[tenDoAn[0]]);
    const ws2 = XLSX.utils.json_to_sheet(csvData[tenDoAn[1]]);
    const ws3 = XLSX.utils.json_to_sheet(csvData[tenDoAn[2]]);

    const wb = {
      Sheets: {
        "Đồ án Cơ sở": ws1,
        "Đồ án Chuyên Ngành": ws2,
        "Đồ án Tổng hợp": ws3,
      },
      SheetNames: ["Đồ án Cơ sở", "Đồ án Chuyên Ngành", "Đồ án Tổng hợp"],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="btn btn-success"
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      Export
    </button>
  );
};
