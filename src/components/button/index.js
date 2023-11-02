import React from "react";
import classNames from "classnames";
import "./index.scss";

const Button = ({
    label,
    className,
    onClick,
    type,
    isDisabled=false
}) => {

    return (
        <>
            <button
                onClick={onClick}
                className={classNames("active-btn", className)}
                type={type}
                disabled={isDisabled}
            >
                {label}
            </button>
        </>
    )
}

export default Button;