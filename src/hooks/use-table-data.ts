export default function useTableData(data: Record<string, string>[]): {
  dataMap: Map<string, Record<string, string>>;
} {
  const dataMap = data.reduce((acc, item) => {
    const key = self.crypto.randomUUID();
    acc.set(key, item);
    return acc;
  }, new Map());

  return { dataMap };
}
