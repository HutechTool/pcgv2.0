import MaterialTable, { MTableToolbar } from "material-table";
import { ExportButtonXLSX } from "./ExportButtonXLSX";

// const hidenAttr = {
//   cellStyle: {
//     display: "none",
//   },
//   headerStyle: {
//     display: "none",
//   },
//   filterCellStyle: {
//     display: "none",
//   },
// };
// const widthCollum = (size) => {
//   return {
//     cellStyle: {
//       width: size,
//       maxWidth: size,
//     },
//     headerStyle: {
//       width: size,
//       maxWidth: size,
//     },
//   };
// };
const getCollums = (keys) => {
  const collums = [];
  keys.forEach((key) => {
    collums.push({ title: key, field: key });
  });
  return collums;
};
export default function Table({ titleTable, data }) {
  if (data === undefined || data?.length === 0) {
    return defaultTable(titleTable);
  }
  const keys = Object.keys(data[0]);
  const columns = getCollums(keys);
  return (
    <MaterialTable
      title={titleTable}
      data={data}
      columns={columns}
      components={{
        Toolbar: (props) => (
          <div style={{ backgroundColor: "white" }}>
            <MTableToolbar {...props} />
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginRight: "20px",
              }}
            >
              <ExportButtonXLSX csvData={data} fileName={titleTable} />
            </div>
          </div>
        ),
      }}
    />
  );
}

const defaultTable = (titleTable) => {
  return (
    <MaterialTable
      style={{ width: "1105px" }}
      title={titleTable}
      localization={{
        body: {
          emptyDataSourceMessage: "Không có dòng nào",
          filterRow: {
            filterTooltip: "Filter",
          },
        },
      }}
    />
  );
};
