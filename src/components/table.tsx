import { ChangeEvent, MouseEvent, ReactNode } from "react";

import useTableData from "../hooks/use-table-data";
import Checkbox from "./checkbox";
import IconButtonWithTooltip from "./icon-button-with-tooltip";

type Props = {
  data: Record<string, string>[];
  renderRules?: Map<string, (colValue: string) => ReactNode>;
};

export default function Table(props: Props) {
  const { data, renderRules } = props;

  const {
    dataMap,
    renderCol,
    selectedItems,
    selectItem,
    deselectItem,
    selectAllItems,
    deselectAllItems,
  } = useTableData(data, renderRules);

  if (data.length === 0) {
    return null;
  }

  const dataArray = [...dataMap.entries()];
  const cols = Object.keys(dataArray[0][1]);

  return (
    <>
      <header className="h-10 px-4 text-left flex items-center gap-4">
        <Checkbox
          data-testid="table-select-all"
          onClick={(evt: MouseEvent<HTMLInputElement>) => {
            if (evt.currentTarget.checked) {
              selectAllItems();
            } else {
              deselectAllItems();
            }
          }}
          {...((selectedItems.length === data.length ||
            selectedItems.length === 0) && {
            checked: selectedItems.length === data.length,
          })}
        />
        <span data-testid="table-select-count">
          {selectedItems.length > 0
            ? `${selectedItems.length} Selected`
            : "None Selected"}
        </span>
      </header>
      <table className="block table-auto w-full">
        <thead>
          <tr>
            <th className="h-10 px-4 border-b border-slate-500 text-left capitalize" />
            {cols.map((colName) => (
              <th
                key={colName}
                className="h-10 px-4 border-b border-slate-500 text-left capitalize"
              >
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-testid="table-body">
          {dataArray.map(([id, row], i) => (
            <tr key={id} data-row={i + 1} role="button">
              <td className="h-10 px-4 border-b border-slate-500 text-left capitalize">
                <input
                  type="checkbox"
                  data-testid="select-row"
                  id={id}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    if (evt.target.checked) {
                      selectItem(id);
                    } else {
                      deselectItem(id);
                    }
                  }}
                  checked={selectedItems.includes(id)}
                />
              </td>
              {cols.map((colName) => (
                <td
                  key={colName}
                  className="h-10 px-4 border-b border-slate-500 text-left capitalize"
                >
                  <label className="flex h-full items-center" htmlFor={id}>
                    {renderCol(row[colName], colName)}
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
