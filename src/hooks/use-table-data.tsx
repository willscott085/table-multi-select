import { ReactNode, useMemo, useState } from "react";

export default function useTableData(
  data: Record<string, string>[],
  renderRules: Map<
    string,
    (colValue: string, colName: string) => ReactNode
  > = new Map()
): {
  dataMap: Map<string, Record<string, string>>;
  renderCol: (colValue: string, colName: string) => ReactNode;
  selectedItems: string[];
  selectItem: (id: string) => void;
  deselectItem: (id: string) => void;
  selectAllItems: () => void;
  deselectAllItems: () => void;
  deselectItems: (ids: string[]) => void;
} {
  const dataMap = useMemo(
    () =>
      data.reduce((acc, item) => {
        const key = self.crypto.randomUUID();
        acc.set(key, item);
        return acc;
      }, new Map()),
    [data]
  );

  const renderCol = (colValue: string, colName: string) => {
    if (renderRules.has(colName)) {
      return renderRules.get(colName)!(colValue, colName);
    }

    return colValue;
  };

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const selectItem = (id: string) => setSelectedItems((prev) => [...prev, id]);
  const deselectItem = (id: string) =>
    setSelectedItems((prev) => prev.filter((x) => x !== id));

  const selectAllItems = () => {
    setSelectedItems([...dataMap.keys()]);
  };

  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  const deselectItems = (ids: string[]) =>
    setSelectedItems((prev) => prev.filter((x) => !ids.includes(x)));

  return {
    dataMap,
    renderCol,
    selectedItems,
    selectItem,
    deselectItem,
    selectAllItems,
    deselectAllItems,
    deselectItems,
  };
}
