import Table from "./Table";
import { ExportAllXLSX } from "./ExportButtonXLSX";
function ResultPhanCong({ objectPhanCong }) {
  return (
    <div className="mt-3">
      {objectPhanCong ? (
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
      ) : null}
    </div>
  );
}

export default ResultPhanCong;
