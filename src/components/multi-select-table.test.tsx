import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import MultiSelectTable from "./multi-select-table";

describe("MultiSelectTable", () => {
  it("selects all rows", () => {
    render(<MultiSelectTable />);

    screen.debug();
  });

  it("deselects all rows", () => {
    render(<MultiSelectTable />);

    screen.debug();
  });

  it("indicates some selected rows", () => {
    render(<MultiSelectTable />);

    screen.debug();
  });

  it("indicates no selected rows", () => {
    render(<MultiSelectTable />);

    screen.debug();
  });

  it("indicates all selected rows", () => {
    render(<MultiSelectTable />);

    screen.debug();
  });

  it("counts selected rows", () => {
    render(<MultiSelectTable />);

    screen.debug();
  });

  it("defaults when no rows are selected", () => {
    render(<MultiSelectTable />);

    screen.debug();
  });
});
