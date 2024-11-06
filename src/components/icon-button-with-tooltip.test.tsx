import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import IconButtonWithTooltip from "./icon-button-with-tooltip";

describe("IconButtonWithTooltip", () => {
  it("shows icon and tooltip", () => {
    render(<IconButtonWithTooltip />);

    screen.debug();
  });
});
