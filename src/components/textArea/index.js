import React from "react";
import classNames from "classnames";
import "./index.scss"

const TextArea = ({
    rows,
    onChange,
    placeholder,
    name,
    required,
    id,
    label,
    className,
    value
}) => {

    return (
        <>
            <div>
            <label htmlFor={id} className="text-input-label">{label}</label>
            <textarea
                className={classNames("default-textarea-wrap", className)}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                id={id}
                required={required}
                rows={rows}
                value={value}
            />
        </div>
        </>
    )
}
export default TextArea;