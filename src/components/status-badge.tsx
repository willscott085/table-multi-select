import { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = PropsWithChildren & {
  isActive?: boolean;
  className?: string;
};

export default function StatusBadge(props: Props) {
  const { isActive, children, className = "" } = props;

  return (
    <span
      className={clsx(
        "relative flex items-center",
        isActive &&
          "before:size-3 before:bg-green-600 before:rounded-full before:absolute before:left-[-20px]",
        className
      )}
    >
      {children}
    </span>
  );
}
