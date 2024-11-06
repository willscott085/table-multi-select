import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import Checkbox from "./checkbox";

describe("Checkbox", () => {
  it("has 3 states", () => {
    render(<Checkbox />);

    screen.debug();
  });
});
