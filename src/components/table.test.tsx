import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

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
    render(<Table data={data} />);

    expect(screen.getByTestId("table-body").children.length).toBe(2);
  });

  it("custom renders a column", () => {
    const renderRules = new Map();

    renderRules.set("status", (colValue: string) => (
      <span data-testid="custom-wrap">{colValue}</span>
    ));

    render(
      <Table
        data={[
          {
            name: "smss.exe",
            device: "Mario",
            path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
            status: "scheduled",
          },
        ]}
        renderRules={renderRules}
      />
    );

    expect(screen.getByTestId("custom-wrap")).toBeDefined();
  });
});
