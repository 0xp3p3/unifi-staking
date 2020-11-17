import React from "react";

import "./Button.scss";

export const Button: React.FC<{ onClick: () => void; disabled?: boolean }> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <button className="Button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
