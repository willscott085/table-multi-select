import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import Table from "./table";

describe("Table", () => {
  it("renders correct amount of rows", () => {
    render(<Table />);

    screen.debug();
  });
});
