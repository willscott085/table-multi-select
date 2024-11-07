import { ReactNode } from "react";
import useTableData from "../hooks/use-table-data";

type Props = {
  data: Record<string, string>[];
  renderRules?: Map<string, (colValue: string) => ReactNode>;
};

export default function Table(props: Props) {
  const { data, renderRules } = props;

  const { dataMap, renderCol } = useTableData(data, renderRules);

  if (data.length === 0) {
    return null;
  }

  const dataArray = [...dataMap.entries()];
  const cols = Object.keys(dataArray[0][1]);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {cols.map((colName) => (
            <th
              key={colName}
              className="px-4 py-2 border-b border-slate-500 text-left capitalize"
            >
              {colName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody data-testid="table-body">
        {dataArray.map(([id, row], i) => (
          <tr key={id} data-row={i + 1} role="button">
            {cols.map((colName) => (
              <td
                key={colName}
                className="px-4 py-2 border-b border-slate-500 text-left capitalize"
              >
                {renderCol(row[colName], colName)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
