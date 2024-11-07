import { ReactNode } from "react";

export default function useTableData(
  data: Record<string, string>[],
  renderRules: Map<
    string,
    (colValue: string, colName: string) => ReactNode
  > = new Map()
): {
  dataMap: Map<string, Record<string, string>>;
  renderCol: (colValue: string, colName: string) => ReactNode;
} {
  const dataMap = data.reduce((acc, item) => {
    const key = self.crypto.randomUUID();
    acc.set(key, item);
    return acc;
  }, new Map());

  const renderCol = (colValue: string, colName: string) => {
    if (renderRules.has(colName)) {
      return renderRules.get(colName)!(colValue, colName);
    }

    return colValue;
  };

  return { dataMap, renderCol };
}
