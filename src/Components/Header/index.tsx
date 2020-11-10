import React from "react";

import "./Header.scss";

export const Header: React.FC = ({ children }) => {
  return <div className="Header">{children}</div>;
};
