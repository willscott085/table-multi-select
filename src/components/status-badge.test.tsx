import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import StatusBadge from "./status-badge";

describe("StatusBadge", () => {
  it("indicates correct status", () => {
    render(<StatusBadge />);

    screen.debug();
  });
});
