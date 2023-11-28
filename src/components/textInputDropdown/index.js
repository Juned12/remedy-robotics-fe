import React from 'react';
import Select from "react-select";
import "./index.scss";

const TextInputDropdown = ({
    selectedOption,
    handleChange,
    options,
    defaultValue,
    id,
    label
}) => {

    const colourStyles = {
        control: (base) => ({ ...base, border: 0, boxShadow: 'none' })
    }
  return (
    <div>
        <label htmlFor={id} className="text-input-label">{label}</label>

      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        className='remedy-dropdown'
        styles={colourStyles}
        defaultValue={defaultValue}
        id={id}
      />
    </div>
  );
}

export default TextInputDropdown;
