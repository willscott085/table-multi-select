import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Table from "./table";

const data = [
  {
    name: "smss.exe",
    device: "Mario",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },

  {
    name: "netsh.exe",
    device: "Luigi",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },
];

describe("Table", () => {
  it("renders correct amount of rows", () => {
    render(<Table data={data} onSelect={() => {}} />);

    expect(screen.getByTestId("table-body").children.length).toBe(2);
  });

  it("returns correct item of clicked row", () => {
    const handleSelect = vi.fn();
    render(<Table data={data} onSelect={handleSelect} />);

    const rows = screen.getByTestId("table-body").children;

    fireEvent.click(rows[0]);

    expect(handleSelect).toHaveBeenCalledWith(data[0]);
    expect(handleSelect).toHaveBeenCalledTimes(1);

    fireEvent.click(rows[1]);

    expect(handleSelect).toHaveBeenCalledWith(data[1]);
    expect(handleSelect).toHaveBeenCalledTimes(2);
  });
});
