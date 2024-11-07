import { ChangeEvent, ComponentProps, useEffect, useRef } from "react";

type Props = ComponentProps<"input"> & {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox(props: Props) {
  const { checked, onChange, ...rest } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);

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
    <input ref={checkboxRef} type="checkbox" onChange={onChange} {...rest} />
  );
}
