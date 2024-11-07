import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Checkbox from "./checkbox";

describe("Checkbox", () => {
  it("has 3 states", () => {
    const { rerender } = render(<Checkbox />);
    const checkbox = screen.getByRole<HTMLInputElement>("checkbox");
    expect(checkbox.indeterminate).toBeTruthy();
    expect(checkbox.checked).toBeFalsy();

    rerender(<Checkbox checked />);
    expect(checkbox.indeterminate).toBeFalsy();
    expect(checkbox.checked).toBeTruthy();

    rerender(<Checkbox checked={false} />);
    expect(checkbox.indeterminate).toBeFalsy();
    expect(checkbox.checked).toBeFalsy();
  });

  it("handles clicks", () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} />);

    const checkbox = screen.getByRole<HTMLInputElement>("checkbox");

    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
    expect(checkbox.checked).toBeTruthy();

    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
    expect(checkbox.checked).toBeFalsy();
  });
});
