import React from 'react';
import classNames from 'classnames';
import Select from "react-select";
import "./index.scss";

const TextInputDropdown = ({
    selectedOption,
    handleChange,
    options,
    defaultValue,
    id,
    label,
    placeholder,
    className,
    required,
    wrapperClass
}) => {

    const colourStyles = {
        control: (base) => ({ ...base, border: 0, boxShadow: 'none' })
    }
  return (
    <div className={wrapperClass}>
        <label htmlFor={id} className="text-input-label">{label}</label>
        <div  className='select-wrapper-container'>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            className={classNames('remedy-dropdown', className)}
            styles={colourStyles}
            defaultValue={defaultValue}
            id={id}
            placeholder={placeholder}
          />
          <input 
            className="input-required" 
            type="text" 
            value={selectedOption && JSON.stringify(selectedOption)} 
            tabIndex={-1}
            autoComplete="off" 
            required={required}
            onChange={()=>{}}
          />
        </div>
    </div>
  );
}

export default TextInputDropdown;
