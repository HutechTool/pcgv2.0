import * as XLSX from "xlsx";

import { tenDoAn } from "../handleFile/Variables";

export default function getFilePromise(file) {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const wsname = wb.SheetNames[0];

      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
  return promise;
}

export function get3SemesterPromise(file) {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const data = {};
      let wsname;
      let ws;

      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });

      wsname = wb.SheetNames[0];
      ws = wb.Sheets[wsname];
      data[tenDoAn[0]] = XLSX.utils.sheet_to_json(ws);

      wsname = wb.SheetNames[1];
      ws = wb.Sheets[wsname];
      data[tenDoAn[1]] = XLSX.utils.sheet_to_json(ws);

      wsname = wb.SheetNames[2];
      ws = wb.Sheets[wsname];

      data[tenDoAn[2]] = XLSX.utils.sheet_to_json(ws);

      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
  return promise;
}
