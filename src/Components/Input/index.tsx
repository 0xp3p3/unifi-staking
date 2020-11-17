import React, { useCallback, useMemo, useState } from "react";

import "./Input.scss";

export const Input: React.FC<{
  placeholder?: string;
  onChange?: (val: string) => void;
  value?: string;
  max?: string;
}> = (props) => {
  const [value, setValue] = useState(props.value || "");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = (e as any).target.value;
    setValue(val);
    if (props.onChange) {
      props.onChange(val);
    }
  };

  const maxEnabled = useMemo(() => !!props.max, [props]);

  const onMaxClick = useCallback(() => {
    if (props.max) {
      setValue(props.max);
      if (props.onChange) {
        props.onChange(props.max);
      }
    }
  }, [props]);

  return (
    <span className="Input-Wrapper">
      <input
        type="text"
        placeholder={props.placeholder}
        className={`Input ${maxEnabled ? "max" : "no-max"}`}
        onChange={onChange}
        value={value}
      />
      {maxEnabled && (
        <span className="Input-Wrapper__max" onClick={onMaxClick}>
          MAX
        </span>
      )}
    </span>
  );
};
