import React from "react";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, val, onCh, onBl } = props;
  return (
    <div className="form-floating mt-2">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
      />
      <label htmlFor="i_id">{label}</label>
    </div>
  );
};

export default CustomInput;
