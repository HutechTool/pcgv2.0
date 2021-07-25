import { changeDicToData3x } from "./checkFile";

function addPhanCong(objectPhanCong, objectAdd) {
  if (!objectPhanCong || !objectAdd) return;

  let dicData3x = objectPhanCong.dicData3x;

  let data3x = [];
  let done = objectPhanCong.Done;
  let unassigned = objectAdd.Unassigned;

  for (const [key, value] of Object.entries(objectAdd)) {
    switch (key) {
      case "dicData3x":
        for (const [MSSV, objectSV] of Object.entries(value)) {
          if (dicData3x[MSSV] === undefined) {
            dicData3x[MSSV] = objectSV;
          }
        }
        data3x = changeDicToData3x(dicData3x);
        break;
      case "Done":
        for (const [, objectSV] of Object.entries(value)) {
          done.push(objectSV);
        }
        break;
      default:
        break;
    }
  }

  const newPhanCong = {
    Data3x: data3x,
    Done: done,
    Unassigned: unassigned,
  };

  return newPhanCong;
}
export { addPhanCong };
