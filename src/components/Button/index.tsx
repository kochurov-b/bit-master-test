import React, { ReactNode } from "react";

import "./styles.css";

interface IPropsButton {
  children?: ReactNode | string;
  className?: string;
  disabled?: boolean;
  attrs?: any;
  onClick?: () => void;
}

export default ({
  children,
  onClick,
  className,
  disabled,
  ...attrs
}: IPropsButton) => (
  <button
    {...attrs}
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
