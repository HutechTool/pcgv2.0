export const tenDoAn = [
  "Đồ án cơ sở công nghệ thông tin",
  "Đồ án chuyên ngành công nghệ thông tin",
  "Đồ án tổng hợp công nghệ thông tin",
];
export const screens = {
  CheckFile: "CheckFile",
  PhanCongGV: "PhanCongGV",
  SaveFile: "SaveFile",
};
export const modes = {
  One: "Một học kỳ",
  Many: "Nhiều học kỳ",
  File: "Nhập bằng file",
};

export function tangDoAn(DoAn) {
  switch (DoAn) {
    case tenDoAn[0]:
      return tenDoAn[1];

    case tenDoAn[1]:
      return tenDoAn[2];

    case tenDoAn[2]:
      return "Hoàn thành";

    default:
      return "Lỗi";
  }
}
