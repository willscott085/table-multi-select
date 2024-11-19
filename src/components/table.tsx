import { ChangeEvent, MouseEvent, ReactNode, useState } from "react";

import useTableData from "../hooks/use-table-data";
import Checkbox from "./checkbox";
import DownloadSelectedAction from "./download-selected-action";
import clsx from "clsx";

type Props = {
  data: Record<string, string>[];
  renderRules?: Map<string, (colValue: string) => ReactNode>;
};

export default function Table(props: Props) {
  const { data, renderRules } = props;

  const {
    dataMap,
    selectedItems,
    renderCol,
    selectItem,
    deselectItem,
    selectAllItems,
    deselectAllItems,
    deselectItems,
  } = useTableData(data, renderRules);

  const [isDownloadSelectedActionHovered, setDownloadSelectedActionHovered] =
    useState(false);

  if (data.length === 0) {
    return null;
  }

  const dataArray = [...dataMap.entries()];
  const cols = Object.keys(dataArray[0][1]);

  return (
    <>
      <header className="h-12 px-4 text-left flex items-center gap-6">
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
        <div>
          <DownloadSelectedAction
            selectedItems={selectedItems}
            dataMap={dataMap}
            deselectItems={deselectItems}
            onMouseEnter={() => setDownloadSelectedActionHovered(true)}
            onMouseLeave={() => setDownloadSelectedActionHovered(false)}
          />
        </div>
      </header>
      <table
        className={clsx(
          "block table-auto w-full text-sm",
          isDownloadSelectedActionHovered && "action-hovered"
        )}
      >
        <thead>
          <tr className="bg-slate-50 text-gray-500">
            <th className="h-12 px-4 border-b border-slate-300 text-left capitalize" />
            {cols.map((colName) => (
              <th
                key={colName}
                className="h-12 px-4 border-b border-slate-300 text-left capitalize"
              >
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-testid="table-body">
          {dataArray.map(([id, row], i) => {
            const isSelected = selectedItems.includes(id);
            const isAvailable = row.status === "available";

            return (
              <tr
                key={id}
                data-row={i + 1}
                role="button"
                data-available={isAvailable ? "true" : "false"}
                data-selected={isSelected ? "true" : "false"}
                className={clsx(
                  "hover:bg-slate-100 border-b border-slate-200 focus-within:shadow-[inset_0px_0px_4px_blue]",
                  isSelected && "bg-slate-200 hover:bg-slate-300"
                )}
              >
                <td className="h-12 px-4 text-left capitalize">
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
                    checked={isSelected}
                  />
                </td>
                {cols.map((colName) => (
                  <td key={colName} className="h-12 px-4 text-left capitalize">
                    <label className="flex h-full items-center" htmlFor={id}>
                      {renderCol(row[colName], colName)}
                    </label>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
