import { ComponentProps, MouseEvent, useEffect, useRef } from "react";

type Props = ComponentProps<"input"> & {
  checked?: boolean;
  onChange?: (e: MouseEvent<HTMLInputElement>) => void;
};

export default function Checkbox(props: Props) {
  const { checked, onChange } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  useEffect(() => {
    if (checkboxRef.current) {
      if (checked) {
        checkboxRef.current.checked = true;
        checkboxRef.current.indeterminate = false;
      } else if (checked === false) {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = false;
      } else {
        checkboxRef.current.indeterminate = true;
      }
    }
  }, [checked]);

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      onClick={handleClick}
      onChange={onChange}
    />
  );
}
