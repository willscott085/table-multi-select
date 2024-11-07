import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  it("shows select count", () => {
    const { getByTestId, getByText } = render(<Table data={data} />);

    const text = getByTestId("table-select-count").textContent;

    expect(text).toBe("None Selected");

    fireEvent.click(getByText("Mario"));

    expect(getByTestId("table-select-count").textContent).toBe("1 Selected");

    fireEvent.click(getByText("Mario"));

    expect(getByTestId("table-select-count").textContent).toBe("None Selected");

    fireEvent.click(getByText("Mario"));
    fireEvent.click(getByText("Luigi"));

    expect(getByTestId("table-select-count").textContent).toBe("2 Selected");
  });

  it("selects all items", () => {
    const { getByTestId, getAllByTestId } = render(<Table data={data} />);

    fireEvent.click(getByTestId("table-select-all"));

    getAllByTestId("select-row").forEach((checkbox) => {
      expect((checkbox as HTMLInputElement).checked).toBeTruthy();
    });

    fireEvent.click(getByTestId("table-select-all"));

    getAllByTestId("select-row").forEach((checkbox) => {
      expect((checkbox as HTMLInputElement).checked).toBeFalsy();
    });
  });

  it("shows indetermined state", () => {
    const { getByText, getByTestId } = render(<Table data={data} />);

    fireEvent.click(getByText("Mario"));

    expect(
      (getByTestId("table-select-all") as HTMLInputElement).indeterminate
    ).toBeTruthy();

    fireEvent.click(getByText("Mario"));

    expect(
      (getByTestId("table-select-all") as HTMLInputElement).indeterminate
    ).toBeFalsy();
  });

  it("shows warning when downloading unavailable items", () => {
    const { getByTestId, queryByTestId } = render(<Table data={data} />);

    expect(queryByTestId("unavailable-items-tooltip")).not.toBeInTheDocument();

    fireEvent.click(getByTestId("table-select-all"));
    fireEvent.mouseEnter(getByTestId("download-selected-action"));

    expect(getByTestId("unavailable-items-tooltip")).toBeTruthy();
    expect(getByTestId("unavailable-items-tooltip")).toBeVisible();
  });

  it("alerts a list of downloadable items", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    const { getByTestId, queryByTestId } = render(<Table data={data} />);

    expect(queryByTestId("unavailable-items-tooltip")).not.toBeInTheDocument();

    fireEvent.click(getByTestId("table-select-all"));
    fireEvent.click(getByTestId("download-selected-action"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalledWith(
        "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe | Luigi\n"
      );
    });
  });
});
