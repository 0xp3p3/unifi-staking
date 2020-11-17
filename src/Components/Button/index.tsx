import React from "react";

import "./Button.scss";

export const Button: React.FC<{ onClick: () => void }> = ({
  onClick,
  children,
}) => {
  return (
    <button className="Button" onClick={onClick}>
      {children}
    </button>
  );
};
