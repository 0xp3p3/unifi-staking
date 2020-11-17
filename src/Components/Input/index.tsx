import React, { useState } from "react";

import "./Input.scss";

export const Input: React.FC<{
  placeholder?: string;
  onChange?: (val: string) => void;
  value?: string;
}> = (props) => {
  const [value, setValue] = useState(props.value || "");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = (e as any).target.value;
    setValue(val);
    if (props.onChange) {
      props.onChange(val);
    }
  };

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className="Input"
      onChange={onChange}
      value={value}
    />
  );
};
